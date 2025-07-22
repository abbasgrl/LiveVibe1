import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'
import { Loader2, User, MapPin, Phone, Camera, Instagram, Users, Crown, Star, Zap } from 'lucide-react'

interface PromoterProfileSetupProps {
  isOpen: boolean
  onClose: () => void
  existingProfile?: any
}

export function PromoterProfileSetup({ isOpen, onClose, existingProfile }: PromoterProfileSetupProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  
  // Form state
  const [formData, setFormData] = useState({
    name: existingProfile?.name || '',
    phone_number: existingProfile?.phone_number || '',
    city: existingProfile?.city || '',
    state: existingProfile?.state || '',
    country: existingProfile?.country || '',
    number_of_clients: existingProfile?.number_of_clients?.toString() || '',
    profile_photo_url: existingProfile?.profile_photo_url || '',
    instagram: existingProfile?.instagram || '',
    tiktok: existingProfile?.tiktok || '',
    pinterest: existingProfile?.pinterest || '',
    youtube: existingProfile?.youtube || '',
    behance: existingProfile?.behance || '',
    facebook: existingProfile?.facebook || '',
    linkedin: existingProfile?.linkedin || '',
    spotify: existingProfile?.spotify || '',
    role_type: existingProfile?.role_type || '',
    subscription_plan: existingProfile?.subscription_plan || ''
  })

  // Update form data when existingProfile changes
  React.useEffect(() => {
    if (existingProfile) {
      setFormData({
        name: existingProfile.name || '',
        phone_number: existingProfile.phone_number || '',
        city: existingProfile.city || '',
        state: existingProfile.state || '',
        country: existingProfile.country || '',
        number_of_clients: existingProfile.number_of_clients?.toString() || '',
        profile_photo_url: existingProfile.profile_photo_url || '',
        instagram: existingProfile.instagram || '',
        tiktok: existingProfile.tiktok || '',
        pinterest: existingProfile.pinterest || '',
        youtube: existingProfile.youtube || '',
        behance: existingProfile.behance || '',
        facebook: existingProfile.facebook || '',
        linkedin: existingProfile.linkedin || '',
        spotify: existingProfile.spotify || '',
        role_type: existingProfile.role_type || '',
        subscription_plan: existingProfile.subscription_plan || ''
      })
    }
  }, [existingProfile])

  // Reset form when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setStep(1)
    }
  }, [isOpen])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!user) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('promoter_profiles')
        .upsert({
          user_id: user.id,
          ...formData,
          number_of_clients: formData.number_of_clients ? parseInt(formData.number_of_clients) : null
        })

      if (error) throw error

      toast({
        title: "Success!",
        description: existingProfile ? "Your promoter profile has been updated successfully." : "Your promoter profile has been created successfully.",
      })
      onClose()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || (existingProfile ? "Failed to update profile" : "Failed to create profile"),
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'freemium': return <Zap className="h-5 w-5" />
      case 'vibe_pro': return <Star className="h-5 w-5" />
      case 'vibe_elite': return <Crown className="h-5 w-5" />
      default: return <Zap className="h-5 w-5" />
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'freemium': return 'border-gray-300 hover:border-gray-400'
      case 'vibe_pro': return 'border-blue-300 hover:border-blue-400'
      case 'vibe_elite': return 'border-purple-300 hover:border-purple-400'
      default: return 'border-gray-300'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {existingProfile ? 'Edit Your Promoter Profile' : 'Create Your Promoter Profile'}
          </DialogTitle>
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  i <= step ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">Step {step} of 4</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone_number}
                      onChange={(e) => handleInputChange('phone_number', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Los Angeles"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder="California"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      placeholder="United States"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clients">Number of Clients</Label>
                  <Input
                    id="clients"
                    type="number"
                    value={formData.number_of_clients}
                    onChange={(e) => handleInputChange('number_of_clients', e.target.value)}
                    placeholder="25"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo">Profile Photo URL</Label>
                  <Input
                    id="photo"
                    value={formData.profile_photo_url}
                    onChange={(e) => handleInputChange('profile_photo_url', e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Social Media */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Instagram className="h-5 w-5" />
                  Social Media Profiles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={formData.instagram}
                      onChange={(e) => handleInputChange('instagram', e.target.value)}
                      placeholder="@username or full URL"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tiktok">TikTok</Label>
                    <Input
                      id="tiktok"
                      value={formData.tiktok}
                      onChange={(e) => handleInputChange('tiktok', e.target.value)}
                      placeholder="@username or full URL"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pinterest">Pinterest</Label>
                    <Input
                      id="pinterest"
                      value={formData.pinterest}
                      onChange={(e) => handleInputChange('pinterest', e.target.value)}
                      placeholder="Profile URL"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="youtube">YouTube</Label>
                    <Input
                      id="youtube"
                      value={formData.youtube}
                      onChange={(e) => handleInputChange('youtube', e.target.value)}
                      placeholder="Channel URL"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="behance">Behance</Label>
                    <Input
                      id="behance"
                      value={formData.behance}
                      onChange={(e) => handleInputChange('behance', e.target.value)}
                      placeholder="Portfolio URL"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={formData.facebook}
                      onChange={(e) => handleInputChange('facebook', e.target.value)}
                      placeholder="Profile or page URL"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={(e) => handleInputChange('linkedin', e.target.value)}
                      placeholder="Profile URL"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="spotify">Spotify</Label>
                    <Input
                      id="spotify"
                      value={formData.spotify}
                      onChange={(e) => handleInputChange('spotify', e.target.value)}
                      placeholder="Profile URL"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Role Type */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Your Role
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Are you a promoter or curator? *</Label>
                  <RadioGroup
                    value={formData.role_type}
                    onValueChange={(value) => handleInputChange('role_type', value)}
                    className="space-y-3"
                  >
                    <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors ${
                      formData.role_type === 'promoter' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <RadioGroupItem value="promoter" id="promoter" />
                      <div className="flex-1">
                        <Label htmlFor="promoter" className="font-medium cursor-pointer">Promoter</Label>
                        <p className="text-sm text-gray-600 mt-1">
                          I organize events and book artists for performances
                        </p>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors ${
                      formData.role_type === 'curator' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <RadioGroupItem value="curator" id="curator" />
                      <div className="flex-1">
                        <Label htmlFor="curator" className="font-medium cursor-pointer">Curator</Label>
                        <p className="text-sm text-gray-600 mt-1">
                          I curate talent and connect artists with opportunities
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Subscription Plan */}
          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5" />
                  Choose Your Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Which subscription plan would you like to use? *</Label>
                  <RadioGroup
                    value={formData.subscription_plan}
                    onValueChange={(value) => handleInputChange('subscription_plan', value)}
                    className="space-y-4"
                  >
                    <div className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-colors ${
                      formData.subscription_plan === 'freemium' 
                        ? 'border-gray-500 bg-gray-50' 
                        : getPlanColor('freemium')
                    }`}>
                      <RadioGroupItem value="freemium" id="freemium" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getPlanIcon('freemium')}
                          <Label htmlFor="freemium" className="font-semibold cursor-pointer">Vibe Discovery (Freemium)</Label>
                          <span className="text-lg font-bold text-gray-900">$0/month</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          For the occasional organizer or those wanting to explore the talent pool.
                        </p>
                        <ul className="text-xs text-gray-500 space-y-1">
                          <li>• Create an Organizer Profile</li>
                          <li>• Browse and search the entire Artist Marketplace</li>
                          <li>• Send booking requests to any artist</li>
                          <li>• Bookmark favorite artists</li>
                        </ul>
                      </div>
                    </div>

                    <div className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-colors ${
                      formData.subscription_plan === 'vibe_pro' 
                        ? 'border-blue-500 bg-blue-50' 
                        : getPlanColor('vibe_pro')
                    }`}>
                      <RadioGroupItem value="vibe_pro" id="vibe_pro" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getPlanIcon('vibe_pro')}
                          <Label htmlFor="vibe_pro" className="font-semibold cursor-pointer">Vibe Pro</Label>
                          <span className="text-lg font-bold text-blue-600">$25/month</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          For professional event organizers, venues, and agencies managing multiple bookings.
                        </p>
                        <ul className="text-xs text-gray-500 space-y-1">
                          <li>• All Vibe Discovery features</li>
                          <li>• Unlimited Event Management</li>
                          <li>• Advanced Search Filters</li>
                          <li>• Smart AI Suggestions</li>
                          <li>• Calendar Integration</li>
                          <li>• Contract Management</li>
                        </ul>
                      </div>
                    </div>

                    <div className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-colors ${
                      formData.subscription_plan === 'vibe_elite' 
                        ? 'border-purple-500 bg-purple-50' 
                        : getPlanColor('vibe_elite')
                    }`}>
                      <RadioGroupItem value="vibe_elite" id="vibe_elite" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getPlanIcon('vibe_elite')}
                          <Label htmlFor="vibe_elite" className="font-semibold cursor-pointer">Vibe Elite</Label>
                          <span className="text-lg font-bold text-purple-600">$60/month</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          For high-volume booking agencies, festivals, and large organizations.
                        </p>
                        <ul className="text-xs text-gray-500 space-y-1">
                          <li>• All Vibe Pro features</li>
                          <li>• Team Accounts</li>
                          <li>• Reduced Commission (8% for artists)</li>
                          <li>• Direct Outreach Tools</li>
                          <li>• Custom Analytics & Reporting</li>
                          <li>• Dedicated account manager</li>
                        </ul>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
            >
              Previous
            </Button>
            
            {step < 4 ? (
              <Button
                onClick={nextStep}
                disabled={
                  (step === 1 && (!formData.name || !formData.city || !formData.country)) ||
                  (step === 3 && !formData.role_type)
                }
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading || !formData.role_type || !formData.subscription_plan}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {existingProfile ? 'Updating Profile...' : 'Creating Profile...'}
                  </>
                ) : (
                  existingProfile ? 'Update Profile' : 'Create Profile'
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}