import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Calendar, 
  DollarSign, 
  BarChart3, 
  Settings,
  Upload,
  Play,
  Star,
  MapPin,
  Music,
  Camera,
  Mic,
  Edit,
  Save,
  Eye,
  Heart,
  Share2,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Bell,
  MessageSquare,
  Phone,
  Mail
} from 'lucide-react';
import { format } from 'date-fns';

interface ArtistProfile {
  id: string;
  name: string;
  stageName: string;
  genre: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  socialMedia: {
    instagram: string;
    twitter: string;
    youtube: string;
    spotify: string;
  };
  pricing: {
    baseRate: number;
    currency: string;
    negotiable: boolean;
  };
  media: {
    profileImage: string;
    coverImage: string;
    videos: string[];
    audio: string[];
    photos: string[];
  };
  stats: {
    totalBookings: number;
    rating: number;
    reviewCount: number;
    totalEarnings: number;
    profileViews: number;
  };
  availability: {
    weekdays: boolean;
    weekends: boolean;
    travelRadius: number;
    advanceNotice: number;
  };
}

interface Booking {
  id: string;
  eventName: string;
  eventType: string;
  date: Date;
  venue: string;
  city: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  clientName: string;
  clientEmail: string;
}

const mockArtistProfile: ArtistProfile = {
  id: '1',
  name: 'Luna Martinez',
  stageName: 'Luna',
  genre: 'Pop/R&B',
  bio: 'Passionate singer-songwriter with over 5 years of experience performing at venues across the country. Known for soulful vocals and engaging stage presence.',
  location: 'Los Angeles, CA',
  email: 'luna@example.com',
  phone: '+1 (555) 123-4567',
  website: 'www.lunamartinez.com',
  socialMedia: {
    instagram: '@lunamartinez',
    twitter: '@luna_music',
    youtube: 'Luna Martinez Music',
    spotify: 'Luna Martinez'
  },
  pricing: {
    baseRate: 2500,
    currency: 'USD',
    negotiable: true
  },
  media: {
    profileImage: 'https://images.pexels.com/photos/3756941/pexels-photo-3756941.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
    videos: [],
    audio: [],
    photos: []
  },
  stats: {
    totalBookings: 47,
    rating: 4.9,
    reviewCount: 32,
    totalEarnings: 125000,
    profileViews: 2847
  },
  availability: {
    weekdays: true,
    weekends: true,
    travelRadius: 100,
    advanceNotice: 14
  }
};

const mockBookings: Booking[] = [
  {
    id: '1',
    eventName: 'Summer Music Festival',
    eventType: 'Festival',
    date: new Date('2024-07-15'),
    venue: 'Central Park Amphitheater',
    city: 'New York, NY',
    amount: 10000,
    status: 'confirmed',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah@musicfest.com'
  },
  {
    id: '2',
    eventName: 'Corporate Gala',
    eventType: 'Corporate Event',
    date: new Date('2024-06-20'),
    venue: 'Grand Ballroom',
    city: 'Los Angeles, CA',
    amount: 8000,
    status: 'pending',
    clientName: 'Michael Chen',
    clientEmail: 'michael@techcorp.com'
  },
  {
    id: '3',
    eventName: 'Wedding Reception',
    eventType: 'Wedding',
    date: new Date('2024-08-10'),
    venue: 'Seaside Resort',
    city: 'Miami, FL',
    amount: 5000,
    status: 'completed',
    clientName: 'Emily Rodriguez',
    clientEmail: 'emily@email.com'
  }
];

interface ArtistDashboardProps {
  artistId?: string;
  onClose?: () => void;
}

export function ArtistDashboard({ artistId, onClose }: ArtistDashboardProps) {
  const [profile, setProfile] = useState<ArtistProfile>(mockArtistProfile);
  const [bookings] = useState<Booking[]>(mockBookings);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your artist profile has been successfully updated.",
    });
  };

  const upcomingBookings = bookings.filter(b => b.date > new Date() && b.status !== 'cancelled');
  const thisMonthEarnings = bookings
    .filter(b => b.date.getMonth() === new Date().getMonth() && b.status === 'completed')
    .reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img 
                src={profile.media.profileImage} 
                alt={profile.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">{profile.stageName}</h1>
                <p className="text-sm text-gray-600">{profile.genre}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                Preview Profile
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              {onClose && (
                <Button variant="outline" size="sm" onClick={onClose}>
                  Back to Platform
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-4xl grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Media
            </TabsTrigger>
            <TabsTrigger value="earnings" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Earnings
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700">Total Earnings</p>
                      <p className="text-3xl font-bold text-green-900">
                        ${profile.stats.totalEarnings.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-green-200 p-3 rounded-full">
                      <DollarSign className="h-6 w-6 text-green-700" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-green-600">
                      ${thisMonthEarnings.toLocaleString()} this month
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700">Total Bookings</p>
                      <p className="text-3xl font-bold text-blue-900">{profile.stats.totalBookings}</p>
                    </div>
                    <div className="bg-blue-200 p-3 rounded-full">
                      <Calendar className="h-6 w-6 text-blue-700" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-blue-600">
                      {upcomingBookings.length} upcoming
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700">Rating</p>
                      <p className="text-3xl font-bold text-purple-900">{profile.stats.rating}</p>
                    </div>
                    <div className="bg-purple-200 p-3 rounded-full">
                      <Star className="h-6 w-6 text-purple-700" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-purple-600">
                      {profile.stats.reviewCount} reviews
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-700">Profile Views</p>
                      <p className="text-3xl font-bold text-orange-900">{profile.stats.profileViews}</p>
                    </div>
                    <div className="bg-orange-200 p-3 rounded-full">
                      <Eye className="h-6 w-6 text-orange-700" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-orange-600">
                      +12% this week
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{booking.eventName}</h4>
                          <p className="text-sm text-gray-600">{format(booking.date, 'MMM dd, yyyy')}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${booking.amount.toLocaleString()}</p>
                          <Badge className={`${getStatusColor(booking.status)} flex items-center gap-1 mt-1`}>
                            {getStatusIcon(booking.status)}
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New Media
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Update Availability
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Update Pricing
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message Clients
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Artist Profile</h2>
              <Button 
                onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                className="bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600"
              >
                {isEditing ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Image */}
              <Card>
                <CardContent className="p-6 text-center">
                  <img 
                    src={profile.media.profileImage} 
                    alt={profile.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                  />
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Change Photo
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Basic Info */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stageName">Stage Name</Label>
                      <Input
                        id="stageName"
                        value={profile.stageName}
                        onChange={(e) => setProfile(prev => ({ ...prev, stageName: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="genre">Genre</Label>
                      <Input
                        id="genre"
                        value={profile.genre}
                        onChange={(e) => setProfile(prev => ({ ...prev, genre: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact & Social */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profile.website}
                      onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={profile.socialMedia.instagram}
                      onChange={(e) => setProfile(prev => ({ 
                        ...prev, 
                        socialMedia: { ...prev.socialMedia, instagram: e.target.value }
                      }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="youtube">YouTube</Label>
                    <Input
                      id="youtube"
                      value={profile.socialMedia.youtube}
                      onChange={(e) => setProfile(prev => ({ 
                        ...prev, 
                        socialMedia: { ...prev.socialMedia, youtube: e.target.value }
                      }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="spotify">Spotify</Label>
                    <Input
                      id="spotify"
                      value={profile.socialMedia.spotify}
                      onChange={(e) => setProfile(prev => ({ 
                        ...prev, 
                        socialMedia: { ...prev.socialMedia, spotify: e.target.value }
                      }))}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Bookings</h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Calendar View
                </Button>
                <Button variant="outline">
                  Export
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold">{booking.eventName}</h3>
                            <p className="text-gray-600">{booking.eventType}</p>
                          </div>
                          <Badge className={`${getStatusColor(booking.status)} flex items-center gap-1`}>
                            {getStatusIcon(booking.status)}
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>{format(booking.date, 'MMM dd, yyyy')}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{booking.city}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <DollarSign className="h-4 w-4" />
                            <span>${booking.amount.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="text-sm">
                          <span className="font-medium">Client:</span> {booking.clientName} ({booking.clientEmail})
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 min-w-[120px]">
                        <Button size="sm" variant="outline" className="w-full">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message Client
                        </Button>
                        {booking.status === 'pending' && (
                          <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Accept
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Media Gallery</h2>
              <Button className="bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600">
                <Upload className="mr-2 h-4 w-4" />
                Upload Media
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Music className="h-5 w-5" />
                    Audio Tracks
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center py-12">
                  <Music className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No audio tracks uploaded yet</p>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Audio
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Videos
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center py-12">
                  <Play className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No videos uploaded yet</p>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Video
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Photos
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center py-12">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No photos uploaded yet</p>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photos
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Earnings & Analytics</h2>
              <Button variant="outline">
                Export Report
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">
                    ${profile.stats.totalEarnings.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Total Earnings</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">
                    ${thisMonthEarnings.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">This Month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-600">
                    ${(profile.stats.totalEarnings / profile.stats.totalBookings).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Average per Booking</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings
                    .filter(b => b.status === 'completed')
                    .slice(0, 5)
                    .map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{booking.eventName}</h4>
                        <p className="text-sm text-gray-600">{format(booking.date, 'MMM dd, yyyy')}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">+${booking.amount.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">Completed</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Account Settings</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Availability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="baseRate">Base Rate (USD)</Label>
                    <Input
                      id="baseRate"
                      type="number"
                      value={profile.pricing.baseRate}
                      onChange={(e) => setProfile(prev => ({ 
                        ...prev, 
                        pricing: { ...prev.pricing, baseRate: parseInt(e.target.value) }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="travelRadius">Travel Radius (miles)</Label>
                    <Input
                      id="travelRadius"
                      type="number"
                      value={profile.availability.travelRadius}
                      onChange={(e) => setProfile(prev => ({ 
                        ...prev, 
                        availability: { ...prev.availability, travelRadius: parseInt(e.target.value) }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="advanceNotice">Advance Notice (days)</Label>
                    <Input
                      id="advanceNotice"
                      type="number"
                      value={profile.availability.advanceNotice}
                      onChange={(e) => setProfile(prev => ({ 
                        ...prev, 
                        availability: { ...prev.availability, advanceNotice: parseInt(e.target.value) }
                      }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Email Notifications</Label>
                      <p className="text-sm text-gray-600">Receive booking updates via email</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">SMS Notifications</Label>
                      <p className="text-sm text-gray-600">Receive urgent updates via SMS</p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Push Notifications</Label>
                      <p className="text-sm text-gray-600">Browser notifications</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  Notification Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Privacy Settings
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Deactivate Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}