import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { UserMenu } from '@/components/auth/UserMenu';
import { ArtistProfileSetup } from '@/components/profile/ArtistProfileSetup';
import { ArtistProfile } from '@/components/profile/ArtistProfile';
import { ArtistWheel } from '@/components/ArtistWheel';
import { Toaster } from '@/components/ui/toaster';
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
  Smartphone
} from 'lucide-react';

function AppContent() {
  const [selectedTab, setSelectedTab] = useState('search');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileSetupOpen, setProfileSetupOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();

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

  // Show profile page if user is viewing their profile
  if (showProfile && user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowProfile(false)}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <img 
                    src="/LIVE VIBE.png" 
                    alt="Live Vibe Logo" 
                    className="h-8 w-8 object-contain"
                  />
                  <span className="text-xl font-bold text-gray-900">
                    Live Vibe
                  </span>
                </button>
              </div>
              <UserMenu />
            </div>
          </div>
        </nav>
        <ArtistProfile />
      </div>
    )
  }

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
                className="h-8 w-8 object-contain"
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
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium">Pricing</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 font-medium">About</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <UserMenu onProfileClick={() => setShowProfile(true)} />
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
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => {
                      setAuthMode('signup');
                      setAuthModalOpen(true);
                    }}
                  >
                    Get Started
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
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium">Pricing</a>
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
                  Connect Artists with 
                  <span className="text-blue-600"> Perfect Events</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Live Vibe is the premier platform connecting talented artists with event organizers. 
                  Discover, book, and manage live performances with ease.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
                  onClick={() => {
                    if (user) {
                      setProfileSetupOpen(true);
                    } else {
                      setAuthMode('signup');
                      setAuthModalOpen(true);
                    }
                  }}
                >
                  <Users className="mr-2 h-5 w-5" />
                  {user ? 'Create Profile' : 'Join as Artist'}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-4 text-lg border-2"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Find a Promoter
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Active Artists</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600">Events Booked</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">95%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
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
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose Live Vibe?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to connect artists with perfect events
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Smart Matching", 
                description: "AI-powered algorithm matches artists with perfect events based on genre, location, and budget",
                icon: Zap,
                color: "bg-blue-100 text-blue-600"
              },
              { 
                title: "Secure Booking", 
                description: "Safe and secure booking system with escrow payments and contract management",
                icon: Shield,
                color: "bg-green-100 text-green-600"
              },
              { 
                title: "Global Reach", 
                description: "Connect with artists and events worldwide through our international platform",
                icon: Globe,
                color: "bg-purple-100 text-purple-600"
              },
              { 
                title: "Mobile First", 
                description: "Manage bookings, communicate, and track events on-the-go with our mobile app",
                icon: Smartphone,
                color: "bg-orange-100 text-orange-600"
              },
              { 
                title: "Live Streaming", 
                description: "Stream performances live to expand your audience and create hybrid events",
                icon: Radio,
                color: "bg-red-100 text-red-600"
              },
              { 
                title: "Analytics", 
                description: "Detailed insights and analytics to help artists and organizers make data-driven decisions",
                icon: Trophy,
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Artists</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover talented artists ready to make your event unforgettable
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
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      {artist.price}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">{artist.name}</h3>
                    <p className="text-blue-600 font-medium">{artist.genre}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{artist.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{artist.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      Book Now
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
              variant="outline" 
              className="border-2"
            >
              View All Artists
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to connect artists with events
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { 
                step: 1, 
                title: "Create Profile", 
                description: "Artists create detailed profiles showcasing their talent and availability",
                icon: Users
              },
              { 
                step: 2, 
                title: "Get Discovered", 
                description: "Event organizers browse and discover artists that match their needs",
                icon: Search
              },
              { 
                step: 3, 
                title: "Book & Pay", 
                description: "Secure booking with integrated payment processing and contracts",
                icon: Calendar
              },
              { 
                step: 4, 
                title: "Perform & Review", 
                description: "Successful events lead to reviews and repeat bookings",
                icon: Star
              }
            ].map((item, idx) => (
              <div key={idx} className="text-center space-y-4">
                <div className="relative">
                  <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of artists and event organizers who trust Live Vibe for their booking needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
                onClick={() => {
                  setAuthMode('signup');
                  setAuthModalOpen(true);
                }}
              >
                Join as Artist
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
              >
                Find a Promoter
              </Button>
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
                  className="h-8 w-8 object-contain"
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
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Create Profile</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Find Gigs</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Artist Resources</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Success Stories</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">For Organizers</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Find Promoters</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Post Event</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Event Planning</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Pricing</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact Us</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Live Vibe. All rights reserved.</p>
          </div>
        </div>
      </footer>

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