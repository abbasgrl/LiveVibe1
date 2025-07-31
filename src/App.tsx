import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { UserMenu } from '@/components/auth/UserMenu';
import { ArtistProfileSetup } from '@/components/profile/ArtistProfileSetup';
import { ArtistProfile } from '@/components/profile/ArtistProfile';
import { ArtUpload } from '@/components/profile/ArtUpload';
import { PromoterProfileSetup } from '@/components/profile/PromoterProfileSetup';
import { AIShowcaseStudio } from '@/components/ai-studio/AIShowcaseStudio';
import { ArtistWheel } from '@/components/ArtistWheel';
import { PricingPage } from '@/components/pricing/PricingPage';
import { EventBookingSystem } from '@/components/booking/EventBookingSystem';
import { Toaster } from '@/components/ui/toaster';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Music, 
  Users, 
  Calendar, 
  Star, 
  Upload, 
  Play, 
  MapPin, 
  Zap, 
  Mic, 
  Heart,
  Search,
  Filter,
  Camera,
  Headphones,
  Trophy,
  ArrowRight,
  Sparkles,
  Radio,
  Clock,
  DollarSign,
  Menu,
  X,
  ChevronDown,
  Globe,
  Shield,
  Smartphone,
  Wand2,
  Video,
  Film,
  Palette,
  Bot,
  Rocket,
  TrendingUp,
  Eye,
  Share2,
  User,
  Check
} from 'lucide-react';

function AppContent() {
  const [selectedTab, setSelectedTab] = useState('search');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileSetupOpen, setProfileSetupOpen] = useState(false);
  const [promoterSetupOpen, setPromoterSetupOpen] = useState(false);
  const [artUploadOpen, setArtUploadOpen] = useState(false);
  const [aiStudioOpen, setAiStudioOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [bookingSystemOpen, setBookingSystemOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showArtistOnboarding, setShowArtistOnboarding] = useState(false);
  const { user, loading, signIn } = useAuth();

  // Check for signup parameter on load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('signup') === 'true') {
      setAuthMode('signup')
      setAuthModalOpen(true)
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  // Listen for auth modal close and profile show events
  useEffect(() => {
    const handleCloseAuthModal = () => {
      console.log('App: Closing auth modal')
      setAuthModalOpen(false);
    };
    
    const handleShowProfile = () => {
      console.log('App: Showing profile')
      setShowProfile(true);
    };
    
    const handleStartProfileSetup = () => {
      console.log('App: Starting profile setup')
      setProfileSetupOpen(true);
    };
    
    const handleShowPricingAfterSignup = () => {
      console.log('App: Showing pricing after signup')
      setShowPricing(true);
    };
    
    const handleOpenSignupModal = () => {
      console.log('App: Opening signup modal')
      setAuthMode('signup');
      setAuthModalOpen(true);
    };
    
    window.addEventListener('closeAuthModal', handleCloseAuthModal);
    window.addEventListener('showProfile', handleShowProfile);
    window.addEventListener('startProfileSetup', handleStartProfileSetup);
    window.addEventListener('showPricingAfterSignup', handleShowPricingAfterSignup);
    window.addEventListener('openSignupModal', handleOpenSignupModal);
    
    return () => {
      window.removeEventListener('closeAuthModal', handleCloseAuthModal);
      window.removeEventListener('showProfile', handleShowProfile);
      window.removeEventListener('startProfileSetup', handleStartProfileSetup);
      window.removeEventListener('showPricingAfterSignup', handleShowPricingAfterSignup);
      window.removeEventListener('openSignupModal', handleOpenSignupModal);
    };
  }, []);

  // Handle artist onboarding flow
  const handleStartArtistJourney = () => {
    if (user) {
      setProfileSetupOpen(true);
    } else {
      setShowArtistOnboarding(true);
    }
  };

  const artists = [
    {
      name: "Luna Martinez",
      genre: "Pop/R&B",
      rating: 4.9,
      location: "Los Angeles, CA",
      image: "https://images.pexels.com/photos/3756941/pexels-photo-3756941.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "$2,500",
      verified: true
    },
    {
      name: "Marcus Thunder",
      genre: "Hip-Hop/Rap",
      rating: 4.8,
      location: "Atlanta, GA",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "$3,200",
      verified: true
    },
    {
      name: "Indie Collective",
      genre: "Alternative Rock",
      rating: 4.7,
      location: "Brooklyn, NY",
      image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "$1,800",
      verified: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => {
                // Scroll to top and reset any modal states
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setAuthModalOpen(false);
                setProfileSetupOpen(false);
                setPromoterSetupOpen(false);
                setArtUploadOpen(false);
                setAiStudioOpen(false);
                setShowProfile(false);
                setBookingSystemOpen(false);
                setShowPricing(false);
                setShowArtistOnboarding(false);
                setMobileMenuOpen(false);
              }}
            >
              <img 
                src="/LIVE VIBE.png" 
                alt="Live Vibe Logo" 
                className="h-12 w-12 object-contain"
              />
              <span className="text-xl font-bold text-gray-900">
                Live Vibe
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium">Features</a>
              <a href="#artists" className="text-gray-600 hover:text-gray-900 font-medium">Artists</a>
              <a href="#promoters" className="text-gray-600 hover:text-gray-900 font-medium">Promoters</a>
              <button 
                onClick={() => setShowPricing(true)}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Pricing
              </button>
              <a href="#about" className="text-gray-600 hover:text-gray-900 font-medium">About</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <UserMenu 
                  onProfileClick={() => setShowProfile(true)}
                  onArtClick={() => setArtUploadOpen(true)}
                  onBookingClick={() => setBookingSystemOpen(true)}
                />
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      setAuthMode('signin');
                      setAuthModalOpen(true);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    onClick={() => {
                      setAuthMode('signup');
                      setAuthModalOpen(true);
                    }}
                  >
                    <Wand2 className="mr-2 h-4 w-4" />
                    Create AI Videos
                  </Button>

                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium">Features</a>
                <a href="#artists" className="text-gray-600 hover:text-gray-900 font-medium">Artists</a>
                <a href="#promoters" className="text-gray-600 hover:text-gray-900 font-medium">Promoters</a>
                <button 
                  onClick={() => {
                    setShowPricing(true);
                    setMobileMenuOpen(false);
                  }}
                  className="text-gray-600 hover:text-gray-900 font-medium text-left"
                >
                  Pricing
                </button>
                <a href="#about" className="text-gray-600 hover:text-gray-900 font-medium">About</a>
                {!user && (
                  <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setAuthMode('signin');
                        setAuthModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                    >
                      Sign In
                    </Button>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => {
                        setAuthMode('signup');
                        setAuthModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                    🎵 The Future of Music Creation
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight">
                  Turn Your Music Into
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Viral Videos</span>
                  <br />
                  <span className="text-blue-600">Get Booked Everywhere</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                  The only platform that turns your music into stunning AI videos AND connects you with paying gigs. 
                  <span className="text-purple-600 font-bold">10,000+ artists</span> are already earning more with Live Vibe.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-5 text-xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-200"
                  onClick={handleStartArtistJourney}
                >
                  <Wand2 className="mr-3 h-6 w-6" />
                  Start Creating for FREE
                </Button>
                <Button 
                  size="lg" 
                  variant="ghost" 
                  className="px-8 py-5 text-lg font-semibold text-gray-700 hover:text-purple-600 underline decoration-2 underline-offset-4"
                  onClick={() => {
                    if (user) {
                      setAiStudioOpen(true);
                    } else {
                      setAuthMode('signup');
                      setAuthModalOpen(true);
                    }
                  }}
                >
                  Watch Demo Video →
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-black text-purple-600">50K+</div>
                  <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Videos Created</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-blue-600">$2.5M+</div>
                  <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Artist Earnings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-green-600">98%</div>
                  <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Success Rate</div>
                </div>
              </div>
            </div>
            <div className="relative max-w-md mx-auto">
              <ArtistWheel />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-block">
              <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                ⚡ Supercharge Your Music Career
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Everything You Need to Go
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Viral</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              From AI video creation to booking management - we've got every tool you need to turn your passion into profit
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                title: "🎬 AI Video Magic", 
                description: "Upload your track, pick a vibe, and watch our AI create stunning music videos in under 5 minutes. No editing skills required!",
                icon: Wand2,
                color: "bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600",
                highlight: "Create in 5 mins"
              },
              { 
                title: "🎯 Smart Gig Matching", 
                description: "Our AI finds perfect gigs for your style and location. Get booked for events that actually pay well and fit your vibe.",
                icon: Bot,
                color: "bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-600",
                highlight: "Average $2,500/gig"
              },
              { 
                title: "💰 Instant Payouts", 
                description: "Get paid fast with our secure payment system. Track earnings, manage bookings, and grow your fanbase all in one place.",
                icon: Rocket,
                color: "bg-gradient-to-br from-green-100 to-emerald-100 text-green-600",
                highlight: "Paid in 24hrs"
              }
            ].map((feature, idx) => (
              <Card key={idx} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white rounded-3xl overflow-hidden">
                <CardContent className="p-8 text-center space-y-6 relative">
                  <div className="absolute top-4 right-4">
                    <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                      {feature.highlight}
                    </span>
                  </div>
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${feature.color} mb-4 shadow-lg`}>
                    <feature.icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed font-medium">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Artists Section */}
      <section id="artists" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-block">
              <span className="bg-gradient-to-r from-green-100 to-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                🌟 Success Stories
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Artists Making
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> Real Money</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              See how artists just like you are using Live Vibe to create viral content and book high-paying gigs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.map((artist, idx) => (
              <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={artist.image} 
                    alt={artist.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    {artist.verified && (
                      <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-purple-600 text-white">
                      <Video className="h-3 w-3 mr-1" />
                      AI Videos
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{artist.name}</h3>
                    <p className="text-blue-600 font-medium">{artist.genre}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{artist.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{artist.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                      <DollarSign className="h-4 w-4" />
                      <span>{artist.price}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 mb-4 font-bold rounded-xl"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Start Creating Like {artist.name.split(' ')[0]}
                  </Button>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Book Now
                    </Button>
                    <Button variant="outline" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              <Sparkles className="mr-3 h-6 w-6" />
              Join 10K+ Successful Artists
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Promoters Section */}
      <section id="promoters" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-block">
              <span className="bg-gradient-to-r from-orange-100 to-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                🎪 For Event Pros
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Book Amazing Artists
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"> Instantly</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Skip the endless emails and phone calls. Find, book, and pay talented artists in minutes, not weeks
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                title: "🤖 Smart Matching", 
                description: "Tell us your event details and budget. Our AI instantly finds artists who are perfect for your vibe and available on your dates.",
                icon: Bot,
                color: "bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600",
                highlight: "Find in seconds"
              },
              { 
                title: "⚡ One-Click Booking", 
                description: "No more back-and-forth emails. Send offers, negotiate terms, and finalize bookings all through our secure platform.",
                icon: Calendar,
                color: "bg-gradient-to-br from-green-100 to-teal-100 text-green-600",
                highlight: "Book instantly"
              },
              { 
                title: "💳 Secure Payments", 
                description: "Pay safely with our escrow system. Money is held until the event is complete, protecting both you and the artist.",
                icon: Users,
                color: "bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600",
                highlight: "100% protected"
              }
            ].map((feature, idx) => (
              <Card key={idx} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white rounded-3xl overflow-hidden">
                <CardContent className="p-8 text-center space-y-6 relative">
                  <div className="absolute top-4 right-4">
                    <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                      {feature.highlight}
                    </span>
                  </div>
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${feature.color} mb-4 shadow-lg`}>
                    <feature.icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed font-medium">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
                <Button 
                  size="lg" 
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-12 py-6 text-xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              <Users className="mr-3 h-6 w-6" />
              Start Booking Amazing Artists
                </Button>
              </div>
                </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-block">
              <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                🚀 Our Mission
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              We're Building the Future of
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Music Careers</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Every talented artist deserves to make a living from their passion. We're making that possible with AI and smart technology.
            </p>
                </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-black text-gray-900">Why We Exist</h3>
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
                Too many incredible artists struggle to make ends meet while event organizers waste time searching for talent. 
                We're fixing this broken system with AI that creates amazing content and connects the right people instantly.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-full shadow-lg">
                    <Check className="h-6 w-6 text-white" />
                </div>
                  <span className="text-gray-900 font-semibold text-lg">AI creates professional videos in minutes</span>
              </div>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-3 rounded-full shadow-lg">
                    <Check className="h-6 w-6 text-white" />
            </div>
                  <span className="text-gray-900 font-semibold text-lg">Smart matching finds perfect gigs automatically</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 p-3 rounded-full shadow-lg">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-gray-900 font-semibold text-lg">Secure payments protect everyone involved</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Live Vibe Team"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-pink-600/90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-10 relative z-10">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                  🎯 Join The Revolution
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
                Your Music Career
                <br />
                <span className="text-yellow-300">Starts Today</span>
              </h2>
            </div>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto font-medium">
              Join 10,000+ artists who've already transformed their passion into profit with Live Vibe
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 px-12 py-6 text-xl font-black rounded-full shadow-2xl transform hover:scale-105 transition-all duration-200"
                onClick={handleStartArtistJourney}
              >
                <Sparkles className="mr-3 h-6 w-6" />
                Start Your Success Story - FREE
              </Button>
              <div className="text-center">
                <p className="text-white/80 text-sm font-semibold">
                  ✨ No credit card required • Start earning in 24 hours
                </p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-black text-yellow-300">$2,500</div>
                  <div className="text-sm text-white/80 font-semibold">Avg. Monthly Earnings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-yellow-300">24hrs</div>
                  <div className="text-sm text-white/80 font-semibold">To First Booking</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-yellow-300">FREE</div>
                  <div className="text-sm text-white/80 font-semibold">Forever Plan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div 
                className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => {
                  // Scroll to top and reset any modal states
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setAuthModalOpen(false);
                  setProfileSetupOpen(false);
                  setPromoterSetupOpen(false);
                  setArtUploadOpen(false);
                  setAiStudioOpen(false);
                  setShowProfile(false);
                  setBookingSystemOpen(false);
                  setShowPricing(false);
                  setShowArtistOnboarding(false);
                  setMobileMenuOpen(false);
                }}
              >
                <img 
                  src="/LIVE VIBE.png" 
                  alt="Live Vibe Logo" 
                  className="h-12 w-12 object-contain"
                />
                <span className="text-xl font-bold">Live Vibe</span>
              </div>
              <p className="text-gray-400">
                Connecting artists with perfect events worldwide.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">For Artists</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">AI Video Studio</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Create Portfolio</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Get Bookings</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Success Stories</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">For Organizers</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Find Artists</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Post Event</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Event Planning</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Pricing</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">AI Features</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Music Videos</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Lyric Videos</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Visual Content</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">YouTube Upload</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Live Vibe. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Pricing Page Modal */}
      {showPricing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Pricing Plans</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPricing(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Starter",
                    price: "$9",
                    period: "month",
                    description: "Perfect for new artists",
                    features: [
                      "5 AI video generations per month",
                      "Basic artist profile",
                      "Event discovery",
                      "Email support"
                    ],
                    popular: false,
                    color: "border-gray-200"
                  },
                  {
                    name: "Pro",
                    price: "$29",
                    period: "month",
                    description: "For growing artists",
                    features: [
                      "25 AI video generations per month",
                      "Advanced profile customization",
                      "Priority event matching",
                      "Analytics dashboard",
                      "Priority support"
                    ],
                    popular: true,
                    color: "border-purple-500"
                  },
                  {
                    name: "Elite",
                    price: "$99",
                    period: "month",
                    description: "For professional artists",
                    features: [
                      "Unlimited AI video generations",
                      "Premium profile placement",
                      "Direct booking requests",
                      "Advanced analytics",
                      "Dedicated support",
                      "Custom integrations"
                    ],
                    popular: false,
                    color: "border-gray-200"
                  }
                ].map((plan, idx) => (
                  <Card key={idx} className={`border-2 ${plan.color} ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}>
                    <CardHeader className="text-center">
                      {plan.popular && (
                        <Badge className="w-fit mx-auto mb-2 bg-purple-600">Most Popular</Badge>
                      )}
                      <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                      <div className="text-3xl font-bold text-gray-900">
                        {plan.price}<span className="text-lg text-gray-500">/{plan.period}</span>
                      </div>
                      <p className="text-gray-600">{plan.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIdx) => (
                          <li key={featureIdx} className="flex items-center gap-3">
                            <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className={`w-full ${plan.popular ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                        onClick={() => {
                          if (user) {
                            // Handle subscription
                            setShowPricing(false);
                          } else {
                            setAuthMode('signup');
                            setAuthModalOpen(true);
                            setShowPricing(false);
                          }
                        }}
                      >
                        {plan.popular ? 'Get Started' : 'Choose Plan'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
      <ArtistProfileSetup
        isOpen={profileSetupOpen}
        existingProfile={null}
        onClose={() => setProfileSetupOpen(false)}
      />
      <PromoterProfileSetup
        isOpen={promoterSetupOpen}
        existingProfile={null}
        onClose={() => setPromoterSetupOpen(false)}
      />
      <ArtUpload
        isOpen={artUploadOpen}
        onClose={() => setArtUploadOpen(false)}
      />
      <AIShowcaseStudio
        isOpen={aiStudioOpen}
        onClose={() => setAiStudioOpen(false)}
      />
      <EventBookingSystem
        isOpen={bookingSystemOpen}
        onClose={() => setBookingSystemOpen(false)}
      />
      
      {/* Artist Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Artist Profile</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowProfile(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="p-6">
              <ArtistProfile />
            </div>
          </div>
        </div>
      )}
      
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;