import React, { useState, useEffect } from 'react';
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
  Volume2,
  Eye,
  MessageCircle,
  Share2,
  Flame,
  TrendingUp,
  Globe,
  ChevronDown,
  Menu,
  X,
  UserPlus,
  Bell,
  Settings
} from 'lucide-react';

function App() {
  const [selectedTab, setSelectedTab] = useState('discover');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredEvents = [
    {
      title: "Neon Nights Festival",
      artist: "Luna Martinez & Friends",
      date: "Dec 15, 2024",
      location: "Los Angeles, CA",
      image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800",
      viewers: "12.5K",
      genre: "Electronic",
      isLive: true
    },
    {
      title: "Underground Sessions",
      artist: "Marcus Thunder",
      date: "Dec 18, 2024",
      location: "Brooklyn, NY",
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
      viewers: "8.2K",
      genre: "Hip-Hop",
      isLive: false
    },
    {
      title: "Indie Collective Live",
      artist: "Various Artists",
      date: "Dec 20, 2024",
      location: "Austin, TX",
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800",
      viewers: "15.8K",
      genre: "Alternative",
      isLive: false
    }
  ];

  const creators = [
    {
      name: "Luna Martinez",
      handle: "@lunabeats",
      followers: "125K",
      avatar: "https://images.pexels.com/photos/3756941/pexels-photo-3756941.jpeg?auto=compress&cs=tinysrgb&w=200",
      isVerified: true,
      genre: "Electronic Pop",
      isLive: true
    },
    {
      name: "Marcus Thunder",
      handle: "@marcusthunder",
      followers: "89K",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200",
      isVerified: true,
      genre: "Hip-Hop",
      isLive: false
    },
    {
      name: "Indie Collective",
      handle: "@indiecollective",
      followers: "67K",
      avatar: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=200",
      isVerified: false,
      genre: "Alternative Rock",
      isLive: false
    }
  ];

  const contentFeed = [
    {
      creator: "Luna Martinez",
      handle: "@lunabeats",
      avatar: "https://images.pexels.com/photos/3756941/pexels-photo-3756941.jpeg?auto=compress&cs=tinysrgb&w=100",
      content: "New track preview 🔥",
      image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400",
      likes: "2.4K",
      comments: "156",
      shares: "89",
      time: "2h ago",
      type: "audio"
    },
    {
      creator: "Marcus Thunder",
      handle: "@marcusthunder",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100",
      content: "Behind the scenes from last night's show",
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400",
      likes: "1.8K",
      comments: "92",
      shares: "45",
      time: "4h ago",
      type: "video"
    }
  ];

  return (
    <div className="min-h-screen bg-[#18191F] text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-[#18191F]/95 backdrop-blur-xl border-b border-gray-800' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF6723] to-[#B102E3] rounded-lg flex items-center justify-center">
                <Music className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#FF6723] to-[#21FFE3] bg-clip-text text-transparent">
                Live Vibe
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#discover" className="text-gray-300 hover:text-[#FF6723] transition-colors duration-200 font-medium">Discover</a>
              <a href="#events" className="text-gray-300 hover:text-[#FF6723] transition-colors duration-200 font-medium">Events</a>
              <a href="#creators" className="text-gray-300 hover:text-[#FF6723] transition-colors duration-200 font-medium">Creators</a>
              <a href="#live" className="text-gray-300 hover:text-[#FF6723] transition-colors duration-200 font-medium flex items-center gap-1">
                <Radio className="h-4 w-4" />
                Live
              </a>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800">
                <Settings className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-[#FF6723] to-[#B102E3] hover:from-[#FF6723]/80 hover:to-[#B102E3]/80 text-white font-semibold px-6 rounded-full transition-all duration-200 hover:scale-105"
              >
                Join Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#18191F]/95 backdrop-blur-xl border-t border-gray-800">
            <div className="px-4 py-4 space-y-4">
              <a href="#discover" className="block text-gray-300 hover:text-[#FF6723] transition-colors">Discover</a>
              <a href="#events" className="block text-gray-300 hover:text-[#FF6723] transition-colors">Events</a>
              <a href="#creators" className="block text-gray-300 hover:text-[#FF6723] transition-colors">Creators</a>
              <a href="#live" className="block text-gray-300 hover:text-[#FF6723] transition-colors">Live</a>
              <Button className="w-full bg-gradient-to-r from-[#FF6723] to-[#B102E3] text-white">
                Join Now
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6723]/20 via-transparent to-[#21FFE3]/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23FF6723" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#FF6723]/20 to-[#B102E3]/20 border border-[#FF6723]/30 text-[#FF6723] text-sm font-medium">
              <Flame className="h-4 w-4" />
              The Future of Music Discovery
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight">
              Where Music
              <br />
              <span className="bg-gradient-to-r from-[#FF6723] to-[#21FFE3] bg-clip-text text-transparent">
                Comes Alive
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover emerging artists, experience live performances, and connect with a global community of music lovers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#FF6723] to-[#B102E3] hover:from-[#FF6723]/80 hover:to-[#B102E3]/80 text-white text-lg px-8 py-6 rounded-full shadow-2xl hover:shadow-[#FF6723]/25 transition-all duration-300 hover:scale-105 font-semibold"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Discovering
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 rounded-full border-2 border-[#FF6723] text-[#FF6723] hover:bg-[#FF6723] hover:text-white transition-all duration-300 font-semibold"
              >
                <Radio className="mr-2 h-5 w-5" />
                Go Live
              </Button>
            </div>
          </div>

          {/* Featured Live Event */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 backdrop-blur-xl overflow-hidden group hover:border-[#FF6723]/50 transition-all duration-300">
              <div className="relative">
                <img 
                  src={featuredEvents[0].image}
                  alt={featuredEvents[0].title}
                  className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-500 hover:bg-red-600 text-white animate-pulse">
                    <Radio className="h-3 w-3 mr-1" />
                    LIVE
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm">
                    <Eye className="h-3 w-3 mr-1" />
                    {featuredEvents[0].viewers} watching
                  </Badge>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-bold text-white">{featuredEvents[0].title}</h3>
                    <p className="text-[#21FFE3] font-semibold">{featuredEvents[0].artist}</p>
                    <div className="flex items-center gap-4 text-gray-300">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{featuredEvents[0].location}</span>
                      </div>
                      <Badge variant="outline" className="border-[#FF6723] text-[#FF6723]">
                        {featuredEvents[0].genre}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 h-14 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 mb-12">
              <TabsTrigger 
                value="discover" 
                className="rounded-xl text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6723] data-[state=active]:to-[#B102E3] data-[state=active]:text-white"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Discover
              </TabsTrigger>
              <TabsTrigger 
                value="events" 
                className="rounded-xl text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6723] data-[state=active]:to-[#B102E3] data-[state=active]:text-white"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Events
              </TabsTrigger>
              <TabsTrigger 
                value="creators" 
                className="rounded-xl text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6723] data-[state=active]:to-[#B102E3] data-[state=active]:text-white"
              >
                <Users className="mr-2 h-4 w-4" />
                Creators
              </TabsTrigger>
              <TabsTrigger 
                value="feed" 
                className="rounded-xl text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6723] data-[state=active]:to-[#B102E3] data-[state=active]:text-white"
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Feed
              </TabsTrigger>
            </TabsList>
            
            {/* Discover Tab */}
            <TabsContent value="discover" className="space-y-8">
              <div className="text-center space-y-4 mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Discover New Music</h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Explore trending artists, genres, and exclusive content
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input 
                    placeholder="Search artists, genres, or songs..." 
                    className="pl-10 h-12 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 rounded-xl focus:border-[#FF6723] focus:ring-[#FF6723]"
                  />
                </div>
                <Button variant="outline" size="lg" className="rounded-xl border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                {['Electronic', 'Hip-Hop', 'Pop', 'Rock', 'Jazz', 'R&B'].map((genre, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="h-12 rounded-xl border-gray-700 text-gray-300 hover:bg-gradient-to-r hover:from-[#FF6723] hover:to-[#B102E3] hover:text-white hover:border-transparent transition-all duration-200"
                  >
                    {genre}
                  </Button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creators.map((creator, idx) => (
                  <Card key={idx} className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 backdrop-blur-xl hover:border-[#FF6723]/50 transition-all duration-300 group overflow-hidden">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img 
                            src={creator.avatar} 
                            alt={creator.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-gray-700 group-hover:border-[#FF6723] transition-colors duration-200"
                          />
                          {creator.isLive && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-[#18191F] animate-pulse" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-white">{creator.name}</h3>
                            {creator.isVerified && (
                              <Badge className="bg-[#21FFE3] text-black text-xs">
                                ✓
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm">{creator.handle}</p>
                          <p className="text-[#FF6723] text-sm font-semibold">{creator.genre}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-gray-300">
                          <span className="font-semibold text-white">{creator.followers}</span> followers
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-[#FF6723] to-[#B102E3] hover:from-[#FF6723]/80 hover:to-[#B102E3]/80 text-white rounded-full"
                        >
                          <UserPlus className="h-4 w-4 mr-1" />
                          Follow
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-8">
              <div className="text-center space-y-4 mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Upcoming Events</h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Don't miss out on the hottest live performances
                </p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <Button variant="outline" className="rounded-full border-gray-700 text-gray-300 hover:bg-[#FF6723] hover:text-white hover:border-[#FF6723]">
                  <MapPin className="mr-2 h-4 w-4" />
                  All Locations
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="rounded-full border-gray-700 text-gray-300 hover:bg-[#FF6723] hover:text-white hover:border-[#FF6723]">
                  <Calendar className="mr-2 h-4 w-4" />
                  This Week
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="rounded-full border-gray-700 text-gray-300 hover:bg-[#FF6723] hover:text-white hover:border-[#FF6723]">
                  <Music className="mr-2 h-4 w-4" />
                  All Genres
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredEvents.map((event, idx) => (
                  <Card key={idx} className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 backdrop-blur-xl hover:border-[#FF6723]/50 transition-all duration-300 group overflow-hidden">
                    <div className="relative">
                      <img 
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {event.isLive && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-red-500 hover:bg-red-600 text-white animate-pulse">
                            <Radio className="h-3 w-3 mr-1" />
                            LIVE
                          </Badge>
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm">
                          <Eye className="h-3 w-3 mr-1" />
                          {event.viewers}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-bold text-xl text-white group-hover:text-[#FF6723] transition-colors">{event.title}</h3>
                        <p className="text-[#21FFE3] font-semibold">{event.artist}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-[#FF6723] text-[#FF6723]">
                          {event.genre}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-gradient-to-r from-[#FF6723] to-[#B102E3] hover:from-[#FF6723]/80 hover:to-[#B102E3]/80 text-white rounded-xl"
                        >
                          {event.isLive ? 'Watch Live' : 'Get Tickets'}
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-xl border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Creators Tab */}
            <TabsContent value="creators" className="space-y-8">
              <div className="text-center space-y-4 mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Creators</h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Connect with talented artists from around the world
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creators.map((creator, idx) => (
                  <Card key={idx} className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 backdrop-blur-xl hover:border-[#FF6723]/50 transition-all duration-300 group overflow-hidden">
                    <div className="relative p-6 pb-0">
                      <div className="absolute top-4 right-4">
                        {creator.isLive && (
                          <Badge className="bg-red-500 hover:bg-red-600 text-white animate-pulse">
                            <Radio className="h-3 w-3 mr-1" />
                            LIVE
                          </Badge>
                        )}
                      </div>
                      <div className="text-center space-y-4">
                        <div className="relative inline-block">
                          <img 
                            src={creator.avatar} 
                            alt={creator.name}
                            className="w-24 h-24 rounded-full object-cover border-4 border-gray-700 group-hover:border-[#FF6723] transition-colors duration-200 mx-auto"
                          />
                          {creator.isLive && (
                            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-4 border-[#18191F] animate-pulse" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-center gap-2">
                            <h3 className="font-bold text-xl text-white">{creator.name}</h3>
                            {creator.isVerified && (
                              <Badge className="bg-[#21FFE3] text-black text-xs">
                                ✓
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-400">{creator.handle}</p>
                          <p className="text-[#FF6723] font-semibold">{creator.genre}</p>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6 pt-4 space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{creator.followers}</div>
                        <div className="text-gray-400 text-sm">followers</div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-gradient-to-r from-[#FF6723] to-[#B102E3] hover:from-[#FF6723]/80 hover:to-[#B102E3]/80 text-white rounded-xl"
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          Follow
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-xl border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Feed Tab */}
            <TabsContent value="feed" className="space-y-8">
              <div className="text-center space-y-4 mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Content Feed</h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Latest posts from your favorite creators
                </p>
              </div>

              <div className="max-w-2xl mx-auto space-y-6">
                {contentFeed.map((post, idx) => (
                  <Card key={idx} className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 backdrop-blur-xl hover:border-[#FF6723]/50 transition-all duration-300">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={post.avatar} 
                          alt={post.creator}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-700"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-white">{post.creator}</h4>
                            <Badge className="bg-[#21FFE3] text-black text-xs">✓</Badge>
                          </div>
                          <p className="text-gray-400 text-sm">{post.handle} • {post.time}</p>
                        </div>
                        <Badge variant="outline" className="border-[#FF6723] text-[#FF6723]">
                          {post.type}
                        </Badge>
                      </div>
                      
                      <p className="text-white">{post.content}</p>
                      
                      <div className="relative rounded-xl overflow-hidden">
                        <img 
                          src={post.image} 
                          alt="Post content"
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                          <Button size="lg" className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 rounded-full">
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-6">
                          <button className="flex items-center gap-2 text-gray-400 hover:text-[#FF6723] transition-colors">
                            <Heart className="h-5 w-5" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-2 text-gray-400 hover:text-[#21FFE3] transition-colors">
                            <MessageCircle className="h-5 w-5" />
                            <span>{post.comments}</span>
                          </button>
                          <button className="flex items-center gap-2 text-gray-400 hover:text-[#B102E3] transition-colors">
                            <Share2 className="h-5 w-5" />
                            <span>{post.shares}</span>
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Live Streaming Section */}
      <section className="py-20 bg-gradient-to-br from-[#FF6723]/10 via-transparent to-[#B102E3]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#FF6723]/20 to-[#B102E3]/20 border border-[#FF6723]/30 text-[#FF6723] text-sm font-medium">
                <Radio className="h-4 w-4" />
                Live Streaming Platform
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Go Live, Get Discovered</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Stream your performances, connect with fans in real-time, and build your audience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 backdrop-blur-xl rounded-2xl p-6 space-y-4 hover:border-[#FF6723]/50 transition-all duration-300">
                <div className="bg-gradient-to-br from-red-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <Radio className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Live Performances</h3>
                <p className="text-gray-300">Stream concerts, jam sessions, and intimate acoustic sets to a global audience</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 backdrop-blur-xl rounded-2xl p-6 space-y-4 hover:border-[#21FFE3]/50 transition-all duration-300">
                <div className="bg-gradient-to-br from-[#21FFE3] to-teal-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Real-time Chat</h3>
                <p className="text-gray-300">Interact with your audience through live chat, Q&A sessions, and fan requests</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 backdrop-blur-xl rounded-2xl p-6 space-y-4 hover:border-[#B102E3]/50 transition-all duration-300">
                <div className="bg-gradient-to-br from-[#B102E3] to-purple-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Monetization</h3>
                <p className="text-gray-300">Earn through virtual tips, exclusive content, and premium fan subscriptions</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <Button size="lg" className="bg-gradient-to-r from-[#FF6723] to-[#B102E3] hover:from-[#FF6723]/80 hover:to-[#B102E3]/80 text-white text-lg px-8 py-6 rounded-full shadow-2xl hover:shadow-[#FF6723]/25 transition-all duration-300 hover:scale-105 font-semibold">
                <Radio className="mr-2 h-5 w-5" />
                Start Streaming Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <div className="flex justify-center space-x-12 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">25K+</div>
                  <div className="text-gray-300">Live Streams Daily</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#FF6723]">1M+</div>
                  <div className="text-gray-300">Active Viewers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#21FFE3]">$2M+</div>
                  <div className="text-gray-300">Creator Earnings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-xl border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#FF6723] to-[#B102E3] rounded-lg flex items-center justify-center">
                  <Music className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#FF6723] to-[#21FFE3] bg-clip-text text-transparent">Live Vibe</span>
              </div>
              <p className="text-gray-400">
                The ultimate platform for music discovery, live streaming, and artist-fan connections.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-[#FF6723]">
                  <Globe className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-[#21FFE3]">
                  <Music className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-[#B102E3]">
                  <Radio className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Platform</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-[#FF6723] transition-colors">Discover Music</a>
                <a href="#" className="block text-gray-400 hover:text-[#FF6723] transition-colors">Live Streaming</a>
                <a href="#" className="block text-gray-400 hover:text-[#FF6723] transition-colors">Events</a>
                <a href="#" className="block text-gray-400 hover:text-[#FF6723] transition-colors">Creator Tools</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Community</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-[#21FFE3] transition-colors">Artists</a>
                <a href="#" className="block text-gray-400 hover:text-[#21FFE3] transition-colors">Fans</a>
                <a href="#" className="block text-gray-400 hover:text-[#21FFE3] transition-colors">Events</a>
                <a href="#" className="block text-gray-400 hover:text-[#21FFE3] transition-colors">Blog</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-[#B102E3] transition-colors">Help Center</a>
                <a href="#" className="block text-gray-400 hover:text-[#B102E3] transition-colors">Contact Us</a>
                <a href="#" className="block text-gray-400 hover:text-[#B102E3] transition-colors">Privacy Policy</a>
                <a href="#" className="block text-gray-400 hover:text-[#B102E3] transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Live Vibe. All rights reserved. Where music comes alive.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;