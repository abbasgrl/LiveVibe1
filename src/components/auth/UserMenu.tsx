import React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/contexts/AuthContext'
import { enhancedSupabase } from '@/lib/supabase'
import { User, Settings, LogOut, Camera, Sparkles, Wand2, Calendar } from 'lucide-react'

interface UserMenuProps {
  onProfileClick?: () => void
  onArtClick?: () => void
  onBookingClick?: () => void
}

export function UserMenu({ onProfileClick, onArtClick, onBookingClick }: UserMenuProps) {
  const { user, signOut } = useAuth()
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      fetchProfilePhoto()
    }
  }, [user])

  const fetchProfilePhoto = async () => {
    if (!user) return

    try {
      const { data, error } = await enhancedSupabase
        .from('artist_profiles')
        .select('profile_photo_url')
        .eq('user_id', user.id)
        .single()

      if (error) {
        console.log('No artist profile found, checking promoter profile')
        // Try promoter profile if artist profile doesn't exist
        const { data: promoterData, error: promoterError } = await enhancedSupabase
          .from('promoter_profiles')
          .select('profile_photo_url')
          .eq('user_id', user.id)
          .single()

        if (!promoterError && promoterData?.profile_photo_url) {
          setProfilePhoto(promoterData.profile_photo_url)
        }
      } else if (data?.profile_photo_url) {
        setProfilePhoto(data.profile_photo_url)
      }
    } catch (error) {
      console.log('Could not fetch profile photo:', error)
    }
  }

  if (!user) return null

  const initials = user.email?.charAt(0).toUpperCase() || 'U'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage 
              src={profilePhoto || user.user_metadata?.avatar_url || ''} 
              alt="Profile"
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-r from-purple-600 to-teal-500 text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Welcome!</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onProfileClick}>
          <User className="mr-2 h-4 w-4" />
          <span>My Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onArtClick}>
          <Camera className="mr-2 h-4 w-4" />
          <span>Upload Portfolio</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onBookingClick}>
          <Calendar className="mr-2 h-4 w-4" />
          <span>Event Bookings</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}