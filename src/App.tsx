import React, { useState } from 'react';
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
  DollarSign
} from 'lucide-react';

function App() {
  const [selectedTab, setSelectedTab] = useState('search');

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img 
                src="/live-vibe-logo.svg" 
                alt="Live Vibe Logo" 
                className="h-10 w-10 object-contain"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
                Live Vibe
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-700 hover:text-purple-600 transition-colors">Features</a>
              <a href="#artists" className="text-gray-700 hover:text-purple-600 transition-colors">Artists</a>
              <a href="#pricing" className="text-gray-700 hover:text-purple-600 transition-colors">Pricing</a>
              <Button variant="outline" size="sm">Sign In</Button>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600"
                onClick={() => window.open('https://airtable.com/appniFqOgWyezV5x7/pagbQ4aikBRgw0Epd/form', '_blank')}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-teal-500/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              AI-Powered Artist Platform
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Where Artists 
              <span className="bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent"> Rise</span>
              <br />
              & Vibes Go 
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Global</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Live Vibe empowers artists with AI tools, smart bookings, and fan engagement—all in one revolutionary platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.open('https://airtable.com/appniFqOgWyezV5x7/pagbQ4aikBRgw0Epd/form', '_blank')}
              >
                <Users className="mr-2 h-5 w-5" />
                Create Your Profile
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 rounded-xl border-2 hover:bg-gray-50 transition-all duration-300"
                onClick={() => window.open('https://airtable.com/appniFqOgWyezV5x7/shryv0nldOZuWp1oC', '_blank')}
              >
                <Search className="mr-2 h-5 w-5" />
                Book an Artist
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From setup to stardom in five simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { 
                step: 1, 
                title: "Set Up Profile", 
                description: "Create your artist profile in minutes",
                icon: Users,
                color: "from-purple-500 to-purple-600"
              },
              { 
                step: 2, 
                title: "Upload Your Work", 
                description: "Share your music, videos, and artwork",
                icon: Upload,
                color: "from-blue-500 to-blue-600"
              },
              { 
                step: 3, 
                title: "Get Booked", 
                description: "Connect with venues and event organizers",
                icon: Calendar,
                color: "from-teal-500 to-teal-600"
              },
              { 
                step: 4, 
                title: "Promote Effortlessly", 
                description: "AI-powered marketing and social media",
                icon: Zap,
                color: "from-orange-500 to-orange-600"
              },
              { 
                step: 5, 
                title: "Earn & Collaborate", 
                description: "Monetize your talent and grow your network",
                icon: Trophy,
                color: "from-pink-500 to-pink-600"
              }
            ].map((item, idx) => (
              <Card key={idx} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${item.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="mb-2">Step {item.step}</Badge>
                    <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Studio */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
              <Zap className="h-4 w-4" />
              AI-Powered Creation
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">AI Studio</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform your music, lyrics, and artwork into viral content with our AI-powered tools
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">Create Something Amazing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all cursor-pointer">
                    <Music className="h-8 w-8 text-purple-600 mb-2" />
                    <span className="text-sm font-medium text-purple-700">Music</span>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-teal-50 to-teal-100 hover:from-teal-100 hover:to-teal-200 transition-all cursor-pointer">
                    <Mic className="h-8 w-8 text-teal-600 mb-2" />
                    <span className="text-sm font-medium text-teal-700">Lyrics</span>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 transition-all cursor-pointer">
                    <Camera className="h-8 w-8 text-orange-600 mb-2" />
                    <span className="text-sm font-medium text-orange-700">Artwork</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Input 
                    placeholder="Drop your files here or click to upload..." 
                    className="h-16 text-center border-2 border-dashed border-gray-300 hover:border-purple-400 transition-colors rounded-xl"
                  />
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Generate Video Content
                    <Sparkles className="ml-2 h-5 w-5" />
                  </Button>
                </div>
                
                <div className="flex justify-center space-x-8 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">10K+</div>
                    <div className="text-sm text-gray-600">Videos Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-600">95%</div>
                    <div className="text-sm text-gray-600">Satisfaction Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">2M+</div>
                    <div className="text-sm text-gray-600">Views Generated</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Marketplace */}
      <section id="artists" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Booking Marketplace</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover and book talented artists for your next event
            </p>
          </div>
          
          <div className="space-y-8">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-12 rounded-xl">
                <TabsTrigger value="search" className="rounded-lg text-base">
                  <Search className="mr-2 h-4 w-4" />
                  Search Artists
                </TabsTrigger>
                <TabsTrigger value="book" className="rounded-lg text-base">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Now
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="search" className="space-y-6 mt-8">
                <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                  <div className="flex-1">
                    <Input 
                      placeholder="Search by artist name, genre, or location..." 
                      className="h-12 rounded-xl border-2 focus:border-purple-400"
                    />
                  </div>
                  <Button variant="outline" size="lg" className="rounded-xl">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="book" className="space-y-6 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <Input type="date" className="h-12 rounded-xl border-2 focus:border-purple-400" />
                  <Input placeholder="Event location" className="h-12 rounded-xl border-2 focus:border-purple-400" />
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artists.map((artist, idx) => (
                <Card key={idx} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg overflow-hidden">
                  <div className="relative">
                    <img 
                      src={artist.image} 
                      alt={artist.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      {artist.verified && (
                        <Badge className="bg-green-500 hover:bg-green-600">
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
                      <h3 className="font-bold text-xl text-gray-900">{artist.name}</h3>
                      <p className="text-purple-600 font-medium">{artist.genre}</p>
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
                        className="flex-1 bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 rounded-xl"
                        onClick={() => window.open('https://airtable.com/appniFqOgWyezV5x7/shryv0nldOZuWp1oC', '_blank')}
                      >
                        View Profile
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-xl">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fan Engagement */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
                <Radio className="h-4 w-4" />
                Live Streaming & Engagement
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Fan Engagement</h2>
              <p className="text-xl text-purple-100 max-w-2xl mx-auto">
                Go live, send shoutouts, or build your fan community with built-in tools designed for artists
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                <div className="bg-gradient-to-br from-red-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <Radio className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Live Streaming</h3>
                <p className="text-purple-100">Stream performances, behind-the-scenes content, and connect with fans in real-time</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                <div className="bg-gradient-to-br from-orange-500 to-yellow-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <Headphones className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Shoutouts</h3>
                <p className="text-purple-100">Create personalized messages for fans and monetize your interactions</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                <div className="bg-gradient-to-br from-teal-500 to-green-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Community Building</h3>
                <p className="text-purple-100">Build and nurture your fan community with exclusive content and interactions</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Radio className="mr-2 h-5 w-5" />
                Go Live Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <div className="flex justify-center space-x-12 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">50K+</div>
                  <div className="text-purple-100">Active Streamers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">2M+</div>
                  <div className="text-purple-100">Monthly Viewers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">$500K+</div>
                  <div className="text-purple-100">Artist Earnings</div>
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
                  src="/live-vibe-logo.svg" 
                  alt="Live Vibe Logo" 
                  className="h-8 w-8 object-contain"
                />
                <span className="text-2xl font-bold">Live Vibe</span>
              </div>
              <p className="text-gray-400">
                Empowering artists worldwide with cutting-edge technology and unlimited opportunities.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Platform</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">AI Studio</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Booking</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Live Streaming</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Analytics</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Community</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact Us</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Status</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Company</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">About</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Careers</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Press</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Legal</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Live Vibe. All rights reserved. Built for artists, by artists.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;