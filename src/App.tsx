import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AuthModal } from "@/components/auth/AuthModal";
import { UserMenu } from "@/components/auth/UserMenu";
import { ArtistProfile } from "@/components/profile/ArtistProfile";
import { ArtUpload } from "@/components/profile/ArtUpload";
import { EventBookingSystem } from "@/components/booking/EventBookingSystem";
import { AIShowcaseStudio } from "@/components/ai-studio/AIShowcaseStudio";
import { PricingPage } from "@/components/pricing/PricingPage";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";
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
  User,
  Menu,
  X,
  Wand2,
  Bot,
  Rocket,
  TrendingUp,
  Film,
  Eye,
  Video,
  Share2
} from 'lucide-react';

function AppContent() {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('search');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showProfile, setShowProfile] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [artUploadOpen, setArtUploadOpen] = useState(false);
  const [bookingSystemOpen, setBookingSystemOpen] = useState(false);
  const [aiStudioOpen, setAiStudioOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleStartArtistJourney = () => {
    if (user) {
      setShowProfile(true);
    } else {
      setAuthMode('signup');
      setAuthModalOpen(true);
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
            <div className="flex items-center gap-3">
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
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Create Stunning 
                  <span className="text-blue-600"> AI Videos</span>
                  <br />
                  <span className="text-purple-600">Get Booked</span> for Events
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Transform your music into professional videos with AI, then get discovered by event organizers worldwide. 
                  Create, showcase, and earn from your talent all in one platform.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg"
                  onClick={handleStartArtistJourney}
                >
                  <Wand2 className="mr-2 h-5 w-5" />
                  Create AI Videos Free
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-4 text-lg border-2"
                  onClick={() => {
                    if (user) {
                      setAiStudioOpen(true);
                    } else {
                      setAuthMode('signup');
                      setAuthModalOpen(true);
                    }
                  }}
                >
                  <Video className="mr-2 h-5 w-5" />
                  See AI Studio
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600">AI Videos Created</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Artists Earning</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">2M+</div>
                  <div className="text-sm text-gray-600">Video Views</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">AI-Powered Artist Platform</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create stunning videos with AI, get discovered by organizers, and build your career
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "AI Video Creation", 
                description: "Transform your music into professional videos using advanced AI. Create music videos, lyric videos, and visual content in minutes",
                icon: Wand2,
                color: "bg-purple-100 text-purple-600"
              },
              { 
                title: "Smart Artist Matching", 
                description: "AI-powered algorithm connects you with perfect events based on your style, location, and availability",
                icon: Bot,
                color: "bg-blue-100 text-blue-600"
              },
              { 
                title: "Instant Portfolio", 
                description: "Upload your work and let AI enhance your portfolio with professional presentations and showcases",
                icon: Rocket,
                color: "bg-green-100 text-green-600"
              },
              { 
                title: "Viral Content Tools", 
                description: "Create shareable content optimized for social media with AI-generated thumbnails and clips",
                icon: TrendingUp,
                color: "bg-orange-100 text-orange-600"
              },
              { 
                title: "YouTube Integration", 
                description: "Automatically upload your AI videos to YouTube with SEO optimization and custom thumbnails",
                icon: Film,
                color: "bg-red-100 text-red-600"
              },
              { 
                title: "Booking Analytics", 
                description: "Track your video performance, booking requests, and earnings with detailed analytics dashboard",
                icon: Eye,
                color: "bg-teal-100 text-teal-600"
              }
            ].map((feature, idx) => (
              <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.color} mb-4`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Artist Showcase */}
      <section id="artists" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">AI-Powered Artist Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how artists are using AI video creation to get more bookings and grow their careers
            </p>
          </div>
          
          {/* AI Video Examples */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Luna's AI Music Video",
                description: "Created a viral music video in 10 minutes, got 50K views, booked 12 events",
                image: "https://images.pexels.com/photos/3756941/pexels-photo-3756941.jpeg?auto=compress&cs=tinysrgb&w=400",
                stats: "50K views • 12 bookings • $15K earned"
              },
              {
                title: "Marcus's Lyric Video",
                description: "AI-generated lyric video led to record label interest and festival bookings",
                image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
                stats: "100K views • 8 bookings • $25K earned"
              },
              {
                title: "Indie Collective's Visual",
                description: "Abstract AI visuals perfectly matched their sound, tripled their booking rate",
                image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400",
                stats: "75K views • 15 bookings • $20K earned"
              }
            ].map((example, idx) => (
              <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={example.image} 
                    alt={example.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button className="bg-white/90 text-gray-900 hover:bg-white">
                      <Play className="h-4 w-4 mr-2" />
                      Watch AI Video
                    </Button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-purple-600 text-white">
                      <Wand2 className="h-3 w-3 mr-1" />
                      AI Created
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{example.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{example.description}</p>
                  <div className="flex items-center gap-2 text-xs text-green-600 font-medium">
                    <TrendingUp className="h-3 w-3" />
                    {example.stats}
                  </div>
                </CardContent>
              </Card>
            ))}
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
                      AI Portfolio
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                    <p className="text-xs text-purple-700 font-medium">
                      Create stunning AI videos to attract event organizers. Artists with AI-powered portfolios receive 10x more booking requests!
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{artist.name}</h3>
                    <p className="text-blue-600 font-medium">{artist.genre}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="bg-purple-100 p-2 rounded-full w-fit mx-auto mb-1">
                        <Wand2 className="h-4 w-4 text-purple-600" />
                      </div>
                      <p className="text-xs text-gray-600">AI Videos</p>
                    </div>
                    <div>
                      <div className="bg-blue-100 p-2 rounded-full w-fit mx-auto mb-1">
                        <Film className="h-4 w-4 text-blue-600" />
                      </div>
                      <p className="text-xs text-gray-600">Showcases</p>
                    </div>
                    <div>
                      <div className="bg-green-100 p-2 rounded-full w-fit mx-auto mb-1">
                        <Share2 className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-xs text-gray-600">Social Media</p>
                    </div>
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
                    onClick={() => {
                      if (user) {
                        setAiStudioOpen(true);
                      } else {
                        setAuthMode('signup');
                        setAuthModalOpen(true);
                      }
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 mb-4"
                  >
                    <Wand2 className="h-4 w-4 mr-2" />
                    Create AI Videos Now
                  </Button>
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
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
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4"
              onClick={handleStartArtistJourney}
            >
              <Wand2 className="mr-2 h-5 w-5" />
              Create Your AI Videos Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">From Music to Bookings in 4 Steps</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create AI videos, get discovered, and start earning from your talent
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Upload Your Music",
                description: "Upload your tracks and let our AI analyze the mood, tempo, and style",
                icon: Upload,
                color: "bg-purple-100 text-purple-600"
              },
              {
                title: "AI Creates Videos",
                description: "Our AI generates stunning visuals that perfectly match your music",
                icon: Wand2,
                color: "bg-blue-100 text-blue-600"
              },
              {
                title: "Get Discovered",
                description: "Event organizers find you through our smart matching algorithm",
                icon: Eye,
                color: "bg-green-100 text-green-600"
              },
              {
                title: "Earn from Bookings",
                description: "Secure bookings and get paid through our platform",
                icon: DollarSign,
                color: "bg-orange-100 text-orange-600"
              }
            ].map((item, idx) => (
              <div key={idx} className="text-center space-y-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${item.color} mb-4`}>
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          
          {/* AI Studio Preview */}
          <div className="mt-20 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border-2 border-dashed border-purple-200">
            <div className="text-center space-y-6">
              <div className="bg-white p-6 rounded-full w-fit mx-auto shadow-lg">
                <Wand2 className="h-16 w-16 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Try Our AI Studio Now</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience the magic of AI video creation. Upload your music and watch it transform into a professional video in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4"
                  onClick={() => {
                    if (user) {
                      setAiStudioOpen(true);
                    } else {
                      setAuthMode('signup');
                      setAuthModalOpen(true);
                    }
                  }}
                >
                  <Wand2 className="mr-2 h-5 w-5" />
                  Start Creating Free
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-4 border-2"
                  onClick={() => {
                    // Scroll to features section
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">10 min</div>
                  <div className="text-sm text-gray-600">Average creation time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">4K</div>
                  <div className="text-sm text-gray-600">Video quality</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">Free</div>
                  <div className="text-sm text-gray-600">First 3 videos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Transform Your Music Career?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of artists using AI to create stunning videos, get more bookings, and build successful careers
            </p>
            
            {/* Success Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-blue-100">AI Videos Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-blue-100">Artists Earning</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">$2.5M+</div>
                <div className="text-blue-100">Total Artist Earnings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-blue-100">Success Rate</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                onClick={handleStartArtistJourney}
              >
                <Wand2 className="mr-2 h-5 w-5" />
                Create AI Videos Free
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg"
                onClick={() => {
                  if (user) {
                    setAiStudioOpen(true);
                  } else {
                    setAuthMode('signup');
                    setAuthModalOpen(true);
                  }
                }}
              >
                <Video className="mr-2 h-5 w-5" />
                Try AI Studio
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-4 text-white">
                <div className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  <span className="font-medium">AI Video Creation</span>
                </div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span className="font-medium">Event Bookings</span>
                </div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  <span className="font-medium">Secure Payments</span>
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
              <div className="flex items-center gap-3">
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

      {/* Modals */}
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
      />
      
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="sr-only">Artist Profile</DialogTitle>
          </DialogHeader>
          <ArtistProfile />
        </DialogContent>
      </Dialog>
      
      <Dialog open={showPricing} onOpenChange={setShowPricing}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="sr-only">Pricing</DialogTitle>
          </DialogHeader>
          <PricingPage />
        </DialogContent>
      </Dialog>
      
      {artUploadOpen && (
        <ArtUpload 
          isOpen={artUploadOpen}
          onClose={() => setArtUploadOpen(false)}
        />
      )}
      
      {bookingSystemOpen && (
        <EventBookingSystem 
          isOpen={bookingSystemOpen}
          onClose={() => setBookingSystemOpen(false)}
        />
      )}
      
      {aiStudioOpen && (
        <AIShowcaseStudio 
          isOpen={aiStudioOpen}
          onClose={() => setAiStudioOpen(false)}
        />
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