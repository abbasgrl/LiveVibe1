import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'
import { ArtistProfileSetup } from './ArtistProfileSetup'
import { 
  User, 
  MapPin, 
  Phone, 
  Edit, 
  Instagram, 
  Music, 
  Palette,
  Globe,
  Camera,
  Mic,
  Guitar,
  Star,
  Calendar,
  DollarSign,
  ExternalLink
} from 'lucide-react'

interface ArtistProfileData {
  id: string
  name: string
  phone_number?: string
  city?: string
  state?: string
  country?: string
  travel_distance?: number
  profile_photo_url?: string
  instagram?: string
  tiktok?: string
  pinterest?: string
  youtube?: string
  behance?: string
  facebook?: string
  linkedin?: string
  spotify?: string
  artist_type?: string
  visual_artist_category?: string
  performing_artist_type?: string
  music_genres?: string[]
  instruments?: string[]
  created_at: string
  updated_at: string
}

export function ArtistProfile() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [profile, setProfile] = useState<ArtistProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [editModalOpen, setEditModalOpen] = useState(false)

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('artist_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      setProfile(data)
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="h-4 w-4" />
      case 'tiktok': return <Music className="h-4 w-4" />
      case 'youtube': return <Camera className="h-4 w-4" />
      case 'spotify': return <Music className="h-4 w-4" />
      default: return <Globe className="h-4 w-4" />
    }
  }

  const formatSocialUrl = (platform: string, value: string) => {
    if (value.startsWith('http')) return value
    
    switch (platform) {
      case 'instagram':
        return value.startsWith('@') ? `https://instagram.com/${value.slice(1)}` : `https://instagram.com/${value}`
      case 'tiktok':
        return value.startsWith('@') ? `https://tiktok.com/${value}` : `https://tiktok.com/@${value}`
      case 'youtube':
        return value.includes('youtube.com') ? value : `https://youtube.com/${value}`
      case 'spotify':
        return value.includes('spotify.com') ? value : `https://open.spotify.com/artist/${value}`
      case 'facebook':
        return value.includes('facebook.com') ? value : `https://facebook.com/${value}`
      case 'linkedin':
        return value.includes('linkedin.com') ? value : `https://linkedin.com/in/${value}`
      case 'behance':
        return value.includes('behance.net') ? value : `https://behance.net/${value}`
      case 'pinterest':
        return value.includes('pinterest.com') ? value : `https://pinterest.com/${value}`
      default:
        return value
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="text-center py-12">
          <CardContent>
            <User className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Profile Found</h2>
            <p className="text-gray-600 mb-6">
              You haven't created an artist profile yet. Create one to get discovered by event organizers.
            </p>
            <Button 
              onClick={() => setEditModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Create Profile
            </Button>
          </CardContent>
        </Card>
        <ArtistProfileSetup
          isOpen={editModalOpen}
          onClose={() => {
            setEditModalOpen(false)
            fetchProfile()
          }}
        />
      </div>
    )
  }

  const socialPlatforms = [
    { key: 'instagram', label: 'Instagram', value: profile.instagram },
    { key: 'tiktok', label: 'TikTok', value: profile.tiktok },
    { key: 'youtube', label: 'YouTube', value: profile.youtube },
    { key: 'spotify', label: 'Spotify', value: profile.spotify },
    { key: 'facebook', label: 'Facebook', value: profile.facebook },
    { key: 'linkedin', label: 'LinkedIn', value: profile.linkedin },
    { key: 'behance', label: 'Behance', value: profile.behance },
    { key: 'pinterest', label: 'Pinterest', value: profile.pinterest },
  ].filter(platform => platform.value)

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Artist Profile</h1>
          <p className="text-gray-600">Manage your artist information and showcase your talent</p>
        </div>
        <Button 
          onClick={() => setEditModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      {/* Main Profile Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32"></div>
        <CardContent className="relative pt-0 pb-8">
          <div className="flex flex-col md:flex-row md:items-end md:space-x-6 -mt-16 relative z-10">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg mb-4 md:mb-0">
              <AvatarImage src={profile.profile_photo_url} alt={profile.name} />
              <AvatarFallback className="text-2xl bg-gray-200">
                {profile.name?.charAt(0)?.toUpperCase() || 'A'}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
              
              {/* Artist Type Badges */}
              <div className="flex flex-wrap gap-2">
                {profile.artist_type === 'visual' && (
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                    <Palette className="h-3 w-3 mr-1" />
                    Visual Artist
                  </Badge>
                )}
                {profile.artist_type === 'performing' && (
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    <Mic className="h-3 w-3 mr-1" />
                    Performing Artist
                  </Badge>
                )}
                {profile.artist_type === 'both' && (
                  <>
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                      <Palette className="h-3 w-3 mr-1" />
                      Visual Artist
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      <Mic className="h-3 w-3 mr-1" />
                      Performing Artist
                    </Badge>
                  </>
                )}
              </div>

              {/* Location and Contact */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {(profile.city || profile.state || profile.country) && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {[profile.city, profile.state, profile.country].filter(Boolean).join(', ')}
                    </span>
                  </div>
                )}
                {profile.phone_number && (
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    <span>{profile.phone_number}</span>
                  </div>
                )}
                {profile.travel_distance && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>Travels up to {profile.travel_distance} miles</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Artist Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Artist Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.visual_artist_category && (
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Visual Artist Category</h4>
                <p className="text-gray-600 text-sm">{profile.visual_artist_category}</p>
              </div>
            )}
            
            {profile.performing_artist_type && (
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Performing Artist Type</h4>
                <p className="text-gray-600 text-sm capitalize">
                  {profile.performing_artist_type === 'both' ? 'Singer & Instrumentalist' : profile.performing_artist_type}
                </p>
              </div>
            )}

            {profile.music_genres && profile.music_genres.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Music Genres</h4>
                <div className="flex flex-wrap gap-1">
                  {profile.music_genres.map((genre) => (
                    <Badge key={genre} variant="secondary" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {profile.instruments && profile.instruments.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Instruments</h4>
                <div className="space-y-1">
                  {profile.instruments.map((instrument) => (
                    <div key={instrument} className="flex items-center gap-2 text-sm text-gray-600">
                      <Guitar className="h-3 w-3" />
                      <span>{instrument}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Social Media */}
        {socialPlatforms.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Social Media
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {socialPlatforms.map((platform) => (
                  <div key={platform.key} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getSocialIcon(platform.key)}
                      <span className="font-medium text-gray-900">{platform.label}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <a 
                        href={formatSocialUrl(platform.key, platform.value!)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        Visit
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Profile Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Profile Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-600">Total Bookings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-600">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">-</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {new Date(profile.created_at).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-600">Member Since</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ArtistProfileSetup
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false)
          fetchProfile()
        }}
      />
    </div>
  )
}