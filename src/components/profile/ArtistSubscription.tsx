import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'
import { 
  Check, 
  Star, 
  Crown, 
  Zap, 
  Sparkles,
  ArrowRight,
  Loader2
} from 'lucide-react'

interface SubscriptionPlan {
  id: string
  name: string
  type: 'artist' | 'organizer'
  tier: 'starter' | 'pro' | 'elite'
  price_monthly: number
  price_yearly: number
  features: string[]
  commission_rate: number
  ai_generations: number
  active: boolean
}

interface UserSubscription {
  id: string
  plan_id: string
  status: string
  billing_cycle: 'monthly' | 'yearly'
  current_period_end: string
  plan: SubscriptionPlan
}

interface ArtistSubscriptionProps {
  isOpen: boolean
  onClose: () => void
}

export function ArtistSubscription({ isOpen, onClose }: ArtistSubscriptionProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [subscribing, setSubscribing] = useState<string | null>(null)
  const [isYearly, setIsYearly] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null)

  useEffect(() => {
    if (isOpen) {
      fetchPlans()
      if (user) {
        fetchUserSubscription()
      }
    }
  }, [isOpen, user])

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('type', 'artist')
        .eq('active', true)
        .order('price_monthly', { ascending: true })

      if (error) throw error
      setPlans(data || [])
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load subscription plans",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchUserSubscription = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select(`
          *,
          plan:subscription_plans(*)
        `)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single()

      if (error && error.code !== 'PGRST116') throw error
      setUserSubscription(data)
    } catch (error: any) {
      console.log('No active subscription found')
    }
  }

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to subscribe to a plan",
        variant: "destructive",
      })
      return
    }

    setSelectedPlan(plan)
    setConfirmModalOpen(true)
  }

  const confirmSubscription = async () => {
    if (!selectedPlan || !user) return

    setSubscribing(selectedPlan.id)
    try {
      // Cancel existing subscription if any
      if (userSubscription) {
        await supabase
          .from('user_subscriptions')
          .update({ status: 'cancelled' })
          .eq('id', userSubscription.id)
      }

      // Create new subscription
      const endDate = isYearly 
        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

      const { data, error } = await supabase
        .from('user_subscriptions')
        .insert({
          user_id: user.id,
          plan_id: selectedPlan.id,
          status: 'active',
          billing_cycle: isYearly ? 'yearly' : 'monthly',
          current_period_start: new Date().toISOString(),
          current_period_end: endDate.toISOString()
        })
        .select(`
          *,
          plan:subscription_plans(*)
        `)
        .single()

      if (error) throw error

      setUserSubscription(data)
      setConfirmModalOpen(false)
      
      toast({
        title: "Success!",
        description: `Successfully subscribed to ${selectedPlan.name}`,
      })
    } catch (error: any) {
      toast({
        title: "Subscription failed",
        description: error.message || "Failed to process subscription",
        variant: "destructive",
      })
    } finally {
      setSubscribing(null)
    }
  }

  const formatPrice = (cents: number) => {
    return (cents / 100).toFixed(0)
  }

  const getPlanIcon = (tier: string) => {
    switch (tier) {
      case 'starter': return <Zap className="h-6 w-6" />
      case 'pro': return <Star className="h-6 w-6" />
      case 'elite': return <Crown className="h-6 w-6" />
      default: return <Zap className="h-6 w-6" />
    }
  }

  const getPlanColor = (tier: string) => {
    switch (tier) {
      case 'starter': return 'border-gray-200 hover:border-gray-300'
      case 'pro': return 'border-blue-200 hover:border-blue-300 bg-blue-50/50'
      case 'elite': return 'border-purple-200 hover:border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50'
      default: return 'border-gray-200'
    }
  }

  const getButtonColor = (tier: string) => {
    switch (tier) {
      case 'starter': return 'bg-gray-600 hover:bg-gray-700'
      case 'pro': return 'bg-blue-600 hover:bg-blue-700'
      case 'elite': return 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
      default: return 'bg-gray-600 hover:bg-gray-700'
    }
  }

  const isCurrentPlan = (planId: string) => {
    return userSubscription?.plan_id === planId
  }

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Choose Your Artist Plan
          </DialogTitle>
          <p className="text-center text-gray-600">
            Unlock your potential with our comprehensive platform designed for artists
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Subscription Status */}
          {userSubscription && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-blue-900">Current Plan: {userSubscription.plan.name}</h3>
                  <p className="text-sm text-blue-700">
                    Active until {new Date(userSubscription.current_period_end).toLocaleDateString()}
                  </p>
                </div>
                <Badge className="bg-blue-600 text-white">
                  {userSubscription.billing_cycle}
                </Badge>
              </div>
            </div>
          )}

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-blue-600"
            />
            <span className={`text-sm font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
            </span>
            {isYearly && (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                Save up to 17%
              </Badge>
            )}
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const price = isYearly ? plan.price_yearly : plan.price_monthly
              const monthlyPrice = isYearly ? plan.price_yearly / 12 : plan.price_monthly
              
              return (
                <Card 
                  key={plan.id} 
                  className={`relative overflow-hidden transition-all duration-300 ${getPlanColor(plan.tier)} ${
                    plan.tier === 'pro' ? 'scale-105 shadow-xl' : 'hover:shadow-lg'
                  }`}
                >
                  {plan.tier === 'pro' && (
                    <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center py-2 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  {plan.tier === 'elite' && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 text-sm font-medium">
                      Premium Choice
                    </div>
                  )}
                  
                  <CardHeader className={`text-center ${plan.tier === 'pro' || plan.tier === 'elite' ? 'pt-12' : 'pt-6'}`}>
                    <div className="flex items-center justify-center mb-4">
                      <div className={`p-3 rounded-full ${
                        plan.tier === 'starter' ? 'bg-gray-100 text-gray-600' :
                        plan.tier === 'pro' ? 'bg-blue-100 text-blue-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {getPlanIcon(plan.tier)}
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                    <div className="space-y-2">
                      <div className="text-4xl font-bold text-gray-900">
                        ${formatPrice(monthlyPrice)}
                        <span className="text-lg font-normal text-gray-600">/month</span>
                      </div>
                      {isYearly && price > 0 && (
                        <p className="text-sm text-gray-500">
                          Billed ${formatPrice(price)} yearly
                        </p>
                      )}
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <span className="text-gray-600">Commission:</span>
                        <Badge variant="secondary">
                          {(plan.commission_rate * 100).toFixed(0)}%
                        </Badge>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <span className="text-gray-600">AI Generations:</span>
                        <Badge variant="outline">
                          {plan.ai_generations === -1 ? 'Unlimited' : `${plan.ai_generations}/month`}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button
                      onClick={() => handleSubscribe(plan)}
                      disabled={subscribing === plan.id || isCurrentPlan(plan.id)}
                      className={`w-full ${getButtonColor(plan.tier)} text-white`}
                    >
                      {subscribing === plan.id ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : isCurrentPlan(plan.id) ? (
                        'Current Plan'
                      ) : price === 0 ? (
                        'Get Started Free'
                      ) : (
                        <>
                          Subscribe Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                    
                    {isCurrentPlan(plan.id) && userSubscription && (
                      <div className="text-center">
                        <Badge className="bg-green-100 text-green-800">
                          Active until {new Date(userSubscription.current_period_end).toLocaleDateString()}
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Commission Example */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Booking Commission Example:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Booking Fee:</span>
                <span className="font-medium">$1,000</span>
              </div>
              <div className="flex justify-between">
                <span>Live Vibe Commission (10%):</span>
                <span className="font-medium text-red-600">-$100</span>
              </div>
              <div className="flex justify-between">
                <span>Elite Artist Commission (7%):</span>
                <span className="font-medium text-red-600">-$70</span>
              </div>
              <div className="border-t pt-2 space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Standard Artist Receives:</span>
                  <span className="text-green-600">$900</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Elite Artist Receives:</span>
                  <span className="text-green-600">$930</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        <Dialog open={confirmModalOpen} onOpenChange={setConfirmModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Subscription</DialogTitle>
            </DialogHeader>
            {selectedPlan && (
              <div className="space-y-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900">{selectedPlan.name}</h3>
                  <div className="text-2xl font-bold text-gray-900 mt-2">
                    ${formatPrice(isYearly ? selectedPlan.price_yearly / 12 : selectedPlan.price_monthly)}/month
                  </div>
                  {isYearly && selectedPlan.price_yearly > 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                      Billed ${formatPrice(selectedPlan.price_yearly)} yearly
                    </p>
                  )}
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Billing Cycle:</span>
                    <span className="font-medium capitalize">{isYearly ? 'Yearly' : 'Monthly'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Commission Rate:</span>
                    <span className="font-medium">{(selectedPlan.commission_rate * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AI Generations:</span>
                    <span className="font-medium">
                      {selectedPlan.ai_generations === -1 ? 'Unlimited' : `${selectedPlan.ai_generations}/month`}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setConfirmModalOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={confirmSubscription}
                    disabled={!!subscribing}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {subscribing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Confirm'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  )
}