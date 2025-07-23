import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Music, 
  Palette, 
  Heart, 
  Play, 
  Users, 
  Calendar,
  Loader2,
  Eye,
  ExternalLink,
  Instagram,
  Youtube,
  Globe,
  Mic,
  Guitar,
  Crown,
  Zap,
  CheckCircle
} from 'lucide-react'

interface ArtistProfile {
  id: string
  user_id: string
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
  subscription?: {
    plan: {
      name: string
      tier: string
    }
  }
}

interface ArtistGalleryProps {
  isOpen: boolean
  onClose: () => void
}

const MUSIC_GENRES = [
  'Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz', 'Blues', 'Classical', 'Country',
  'R&B', 'Reggae', 'Soul', 'Funk', 'Metal', 'Folk', 'Ska'
]

const ARTIST_TYPES = [
  { value: 'visual', label: 'Visual Artist' },
  { value: 'performing', label: 'Performing Artist' },
  { value: 'both', label: 'Both' }
]

export function ArtistGallery({ isOpen, onClose }: ArtistGalleryProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [artists, setArtists] = useState<ArtistProfile[]>([])
  const [filteredArtists, setFilteredArtists] = useState<ArtistProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedTier, setSelectedTier] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    if (isOpen) {
      fetchArtists()
      fetchFavorites()
    }
  }, [isOpen, user])

  useEffect(() => {
    filterAndSortArtists()
  }, [artists, searchTerm, selectedGenre, selectedType, selectedLocation, selectedTier, sortBy])

  const fetchArtists = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('artist_profiles')
        .select(`
          *,
          subscription:user_subscriptions!inner(
            plan:subscription_plans(name, tier)
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setArtists(data || [])
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load artists",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchFavorites = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .select('artist_id')
        .eq('user_id', user.id)

      if (error) throw error
      setFavorites(data?.map(f => f.artist_id) || [])
    } catch (error: any) {
      console.error('Failed to fetch favorites:', error)
    }
  }

  const toggleFavorite = async (artistId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save favorites",
        variant: "destructive",
      })
      return
    }

    try {
      const isFavorite = favorites.includes(artistId)
      
      if (isFavorite) {
        const { error } = await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('artist_id', artistId)

        if (error) throw error
        setFavorites(prev => prev.filter(id => id !== artistId))
      } else {
        const { error } = await supabase
          .from('user_favorites')
          .insert({
            user_id: user.id,
            artist_id: artistId
          })

        if (error) throw error
        setFavorites(prev => [...prev, artistId])
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update favorites",
        variant: "destructive",
      })
    }
  }

  const filterAndSortArtists = () => {
    let filtered = [...artists]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.music_genres?.some(genre => 
          genre.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        artist.visual_artist_category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        [artist.city, artist.state, artist.country].filter(Boolean).join(', ')
          .toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Genre filter
    if (selectedGenre) {
      filtered = filtered.filter(artist =>
        artist.music_genres?.includes(selectedGenre)
      )
    }

    // Artist type filter
    if (selectedType) {
      filtered = filtered.filter(artist => artist.artist_type === selectedType)
    }

    // Location filter
    if (selectedLocation) {
      filtered = filtered.filter(artist =>
        [artist.city, artist.state, artist.country].filter(Boolean).join(', ')
          .toLowerCase().includes(selectedLocation.toLowerCase())
      )
    }

    // Subscription tier filter
    if (selectedTier) {
      filtered = filtered.filter(artist =>
        artist.subscription?.plan?.tier === selectedTier
      )
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'location':
          const locationA = [a.city, a.state].filter(Boolean).join(', ')
          const locationB = [b.city, b.state].filter(Boolean).join(', ')
          return locationA.localeCompare(locationB)
        case 'tier':
          const tierOrder = { 'starter': 1, 'pro': 2, 'elite': 3 }
          const tierA = tierOrder[a.subscription?.plan?.tier as keyof typeof tierOrder] || 0
          const tierB = tierOrder[b.subscription?.plan?.tier as keyof typeof tierOrder] || 0
          return tierB - tierA
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
    })

    setFilteredArtists(filtered)
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'starter': return <Zap className="h-4 w-4" />
      case 'pro': return <Star className="h-4 w-4" />
      case 'elite': return <Crown className="h-4 w-4" />
      default: return <Zap className="h-4 w-4" />
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'starter': return 'bg-gray-100 text-gray-800'
      case 'pro': return 'bg-blue-100 text-blue-800'
      case 'elite': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="h-4 w-4" />
      case 'youtube': return <Youtube className="h-4 w-4" />
      case 'spotify': return <Music className="h-4 w-4" />
      default: return <Globe className="h-4 w-4" />
    }
  }

  const formatSocialUrl = (platform: string, value: string) => {
    if (value.startsWith('http')) return value
    
    switch (platform) {
      case 'instagram':
        return value.startsWith('@') ? `https://instagram.com/${value.slice(1)}` : `https://instagram.com/${value}`
      case 'youtube':
        return value.includes('youtube.com') ? value : `https://youtube.com/${value}`
      case 'spotify':
        return value.includes('spotify.com') ? value : `https://open.spotify.com/artist/${value}`
      default:
        return value
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Users className="h-6 w-6" />
                Artist Gallery
              </h1>
              <p className="text-blue-100 mt-1">
                Discover talented artists from our community
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              ✕
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search artists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger>
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Genres</SelectItem>
                {MUSIC_GENRES.map((genre) => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                {ARTIST_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedTier} onValueChange={setSelectedTier}>
              <SelectTrigger>
                <SelectValue placeholder="All Tiers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Tiers</SelectItem>
                <SelectItem value="starter">Starter</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="elite">Elite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                  <SelectItem value="tier">Subscription Tier</SelectItem>
                </SelectContent>
              </Select>

              <div className="text-sm text-gray-600">
                {filteredArtists.length} of {artists.length} artists
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                List
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">Loading artists...</p>
            </div>
          ) : filteredArtists.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No artists found</h3>
              <p className="text-gray-600">Try adjusting your search filters</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredArtists.map((artist) => (
                <Card key={artist.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 relative">
                      {artist.profile_photo_url ? (
                        <img 
                          src={artist.profile_photo_url} 
                          alt={artist.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <Avatar className="h-16 w-16 mx-auto mb-2">
                              <AvatarFallback className="text-2xl bg-white">
                                {artist.name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="absolute top-2 right-2 flex gap-1">
                      {artist.subscription?.plan && (
                        <Badge className={`${getTierColor(artist.subscription.plan.tier)} flex items-center gap-1`}>
                          {getTierIcon(artist.subscription.plan.tier)}
                          {artist.subscription.plan.tier}
                        </Badge>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className={`absolute top-2 left-2 ${
                        favorites.includes(artist.id) ? 'text-red-500' : 'text-gray-400'
                      }`}
                      onClick={() => toggleFavorite(artist.id)}
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(artist.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 truncate">{artist.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {artist.artist_type === 'visual' && (
                          <Badge variant="secondary" className="text-xs">
                            <Palette className="h-3 w-3 mr-1" />
                            Visual
                          </Badge>
                        )}
                        {artist.artist_type === 'performing' && (
                          <Badge variant="secondary" className="text-xs">
                            <Mic className="h-3 w-3 mr-1" />
                            Performing
                          </Badge>
                        )}
                        {artist.artist_type === 'both' && (
                          <>
                            <Badge variant="secondary" className="text-xs">
                              <Palette className="h-3 w-3 mr-1" />
                              Visual
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              <Mic className="h-3 w-3 mr-1" />
                              Performing
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>

                    {(artist.city || artist.state || artist.country) && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">
                          {[artist.city, artist.state, artist.country].filter(Boolean).join(', ')}
                        </span>
                      </div>
                    )}

                    {artist.music_genres && artist.music_genres.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {artist.music_genres.slice(0, 2).map((genre) => (
                          <Badge key={genre} variant="outline" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                        {artist.music_genres.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{artist.music_genres.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-1">
                      {artist.instagram && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="h-8 w-8 p-0"
                        >
                          <a 
                            href={formatSocialUrl('instagram', artist.instagram)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Instagram className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                      {artist.youtube && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="h-8 w-8 p-0"
                        >
                          <a 
                            href={formatSocialUrl('youtube', artist.youtube)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Youtube className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                      {artist.spotify && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="h-8 w-8 p-0"
                        >
                          <a 
                            href={formatSocialUrl('spotify', artist.spotify)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Music className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <Eye className="h-3 w-3 mr-1" />
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="h-3 w-3 mr-1" />
                        Book
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredArtists.map((artist) => (
                <Card key={artist.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={artist.profile_photo_url} alt={artist.name} />
                        <AvatarFallback className="text-lg bg-gradient-to-r from-blue-100 to-purple-100">
                          {artist.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{artist.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              {artist.subscription?.plan && (
                                <Badge className={`${getTierColor(artist.subscription.plan.tier)} flex items-center gap-1`}>
                                  {getTierIcon(artist.subscription.plan.tier)}
                                  {artist.subscription.plan.name}
                                </Badge>
                              )}
                              {artist.artist_type === 'visual' && (
                                <Badge variant="secondary">
                                  <Palette className="h-3 w-3 mr-1" />
                                  Visual Artist
                                </Badge>
                              )}
                              {artist.artist_type === 'performing' && (
                                <Badge variant="secondary">
                                  <Mic className="h-3 w-3 mr-1" />
                                  Performing Artist
                                </Badge>
                              )}
                              {artist.artist_type === 'both' && (
                                <Badge variant="secondary">
                                  <Palette className="h-3 w-3 mr-1" />
                                  Multi-Disciplinary
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className={favorites.includes(artist.id) ? 'text-red-500' : 'text-gray-400'}
                            onClick={() => toggleFavorite(artist.id)}
                          >
                            <Heart className={`h-4 w-4 ${favorites.includes(artist.id) ? 'fill-current' : ''}`} />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            {(artist.city || artist.state || artist.country) && (
                              <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                                <MapPin className="h-4 w-4" />
                                <span>
                                  {[artist.city, artist.state, artist.country].filter(Boolean).join(', ')}
                                </span>
                              </div>
                            )}
                            
                            {artist.music_genres && artist.music_genres.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {artist.music_genres.map((genre) => (
                                  <Badge key={genre} variant="outline" className="text-xs">
                                    {genre}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-end gap-2">
                            <div className="flex items-center gap-1">
                              {artist.instagram && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  asChild
                                  className="h-8 w-8 p-0"
                                >
                                  <a 
                                    href={formatSocialUrl('instagram', artist.instagram)} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                  >
                                    <Instagram className="h-4 w-4" />
                                  </a>
                                </Button>
                              )}
                              {artist.youtube && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  asChild
                                  className="h-8 w-8 p-0"
                                >
                                  <a 
                                    href={formatSocialUrl('youtube', artist.youtube)} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                  >
                                    <Youtube className="h-4 w-4" />
                                  </a>
                                </Button>
                              )}
                              {artist.spotify && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  asChild
                                  className="h-8 w-8 p-0"
                                >
                                  <a 
                                    href={formatSocialUrl('spotify', artist.spotify)} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                  >
                                    <Music className="h-4 w-4" />
                                  </a>
                                </Button>
                              )}
                            </div>
                            
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-1" />
                                View Profile
                              </Button>
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                <Calendar className="h-4 w-4 mr-1" />
                                Book Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}