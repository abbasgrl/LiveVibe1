import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'
import { Loader2, Upload, User, MapPin, Phone, Camera, Instagram, Music, Palette } from 'lucide-react'

interface ArtistProfileSetupProps {
  isOpen: boolean
  onClose: () => void
}

const VISUAL_ARTIST_CATEGORIES = [
  'Fine Artists (Painters, Sculptors, Printmakers, Illustrators, Muralists, Installation artists)',
  'Applied/Decorative Artists (Graphic designers, Fashion designers, Industrial designers, Textile artists, Jewelers)',
  'Commercial/Media Artists (Photographers, Filmmakers, Animators, Video game artists, Set designers)',
  'Craft Artists (Ceramists, Potters, Glass artists, Woodworkers, Paper artists)',
  'Architectural and Environmental Artists (Architects, Landscape architects, Urban designers)'
]

const MUSIC_GENRES = [
  'Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz', 'Blues', 'Classical', 'Country',
  'R&B (Rhythm and Blues)', 'Reggae', 'Soul', 'Funk', 'Metal', 'Folk', 'Ska'
]

const INSTRUMENTS = [
  'Strings (Violin, guitar, cello)',
  'Woodwinds (Flute, clarinet, saxophone)',
  'Brass (Trumpet, trombone, tuba)',
  'Percussion (Drum, xylophone, cymbal)',
  'Keyboard (Piano, organ, synthesizer)',
  'Aerophones (Flute, trumpet, harmonica)',
  'Chordophones (Guitar, violin, harp)',
  'Idiophones (Xylophone, bell, maracas)',
  'Membranophones (Snare drum, conga, bass drum)',
  'Electrophones (Synthesizer, electric guitar, theremin)'
]

export function ArtistProfileSetup({ isOpen, onClose }: ArtistProfileSetupProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    city: '',
    state: '',
    country: '',
    travel_distance: '',
    profile_photo_url: '',
    instagram: '',
    tiktok: '',
    pinterest: '',
    youtube: '',
    behance: '',
    facebook: '',
    linkedin: '',
    artist_type: '',
    visual_artist_category: '',
    performing_artist_type: '',
    music_genres: [] as string[],
    instruments: [] as string[]
  })

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleGenreChange = (genre: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({ ...prev, music_genres: [...prev.music_genres, genre] }))
    } else {
      setFormData(prev => ({ ...prev, music_genres: prev.music_genres.filter(g => g !== genre) }))
    }
  }

  const handleInstrumentChange = (instrument: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({ ...prev, instruments: [...prev.instruments, instrument] }))
    } else {
      setFormData(prev => ({ ...prev, instruments: prev.instruments.filter(i => i !== instrument) }))
    }
  }

  const handleSubmit = async () => {
    if (!user) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('artist_profiles')
        .upsert({
          user_id: user.id,
          ...formData,
          travel_distance: formData.travel_distance ? parseInt(formData.travel_distance) : null
        })

      if (error) throw error

      toast({
        title: "Success!",
        description: "Your artist profile has been created successfully.",
      })
      onClose()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create profile",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Create Your Artist Profile
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
                  <Label htmlFor="travel">How far will you travel for work? (miles)</Label>
                  <Input
                    id="travel"
                    type="number"
                    value={formData.travel_distance}
                    onChange={(e) => handleInputChange('travel_distance', e.target.value)}
                    placeholder="50"
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
                    <Label htmlFor="youtube">YouTube</Label>
                    <Input
                      id="youtube"
                      value={formData.youtube}
                      onChange={(e) => handleInputChange('youtube', e.target.value)}
                      placeholder="Channel URL"
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
                    <Label htmlFor="behance">Behance</Label>
                    <Input
                      id="behance"
                      value={formData.behance}
                      onChange={(e) => handleInputChange('behance', e.target.value)}
                      placeholder="Portfolio URL"
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
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Artist Type */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Artist Type
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Are you a visual artist, performing artist, or both? *</Label>
                  <RadioGroup
                    value={formData.artist_type}
                    onValueChange={(value) => handleInputChange('artist_type', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="visual" id="visual" />
                      <Label htmlFor="visual">Visual Artist</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="performing" id="performing" />
                      <Label htmlFor="performing">Performing Artist</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="both" />
                      <Label htmlFor="both">Both</Label>
                    </div>
                  </RadioGroup>
                </div>

                {(formData.artist_type === 'visual' || formData.artist_type === 'both') && (
                  <div className="space-y-4">
                    <Label>Visual Artist Category</Label>
                    <Select
                      value={formData.visual_artist_category}
                      onValueChange={(value) => handleInputChange('visual_artist_category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your category" />
                      </SelectTrigger>
                      <SelectContent>
                        {VISUAL_ARTIST_CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {(formData.artist_type === 'performing' || formData.artist_type === 'both') && (
                  <div className="space-y-4">
                    <Label>Performing Artist Type</Label>
                    <RadioGroup
                      value={formData.performing_artist_type}
                      onValueChange={(value) => handleInputChange('performing_artist_type', value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="singer" id="singer" />
                        <Label htmlFor="singer">Singer/Vocalist</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="instrumentalist" id="instrumentalist" />
                        <Label htmlFor="instrumentalist">Instrumentalist/Musician</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="singer-instrumentalist" />
                        <Label htmlFor="singer-instrumentalist">Both</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 4: Music Details */}
          {step === 4 && (formData.artist_type === 'performing' || formData.artist_type === 'both') && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="h-5 w-5" />
                  Music Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>What genre(s) of music do you play professionally?</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {MUSIC_GENRES.map((genre) => (
                      <div key={genre} className="flex items-center space-x-2">
                        <Checkbox
                          id={genre}
                          checked={formData.music_genres.includes(genre)}
                          onCheckedChange={(checked) => handleGenreChange(genre, checked as boolean)}
                        />
                        <Label htmlFor={genre} className="text-sm">{genre}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {(formData.performing_artist_type === 'instrumentalist' || formData.performing_artist_type === 'both') && (
                  <div className="space-y-4">
                    <Label>What instrument(s) do you play professionally?</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {INSTRUMENTS.map((instrument) => (
                        <div key={instrument} className="flex items-center space-x-2">
                          <Checkbox
                            id={instrument}
                            checked={formData.instruments.includes(instrument)}
                            onCheckedChange={(checked) => handleInstrumentChange(instrument, checked as boolean)}
                          />
                          <Label htmlFor={instrument} className="text-sm">{instrument}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
                  (step === 3 && !formData.artist_type)
                }
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading || !formData.artist_type}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Profile...
                  </>
                ) : (
                  'Create Profile'
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}