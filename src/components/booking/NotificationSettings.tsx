import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Smartphone,
  Settings,
  Save
} from 'lucide-react';

interface NotificationPreferences {
  email: {
    enabled: boolean;
    newBookings: boolean;
    statusUpdates: boolean;
    payments: boolean;
    reminders: boolean;
  };
  sms: {
    enabled: boolean;
    urgentOnly: boolean;
    newBookings: boolean;
    statusUpdates: boolean;
  };
  push: {
    enabled: boolean;
    newBookings: boolean;
    statusUpdates: boolean;
    payments: boolean;
    marketing: boolean;
  };
  frequency: 'instant' | 'hourly' | 'daily';
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: {
      enabled: true,
      newBookings: true,
      statusUpdates: true,
      payments: true,
      reminders: true,
    },
    sms: {
      enabled: false,
      urgentOnly: true,
      newBookings: false,
      statusUpdates: false,
    },
    push: {
      enabled: true,
      newBookings: true,
      statusUpdates: true,
      payments: false,
      marketing: false,
    },
    frequency: 'instant',
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '08:00',
    },
  });

  const [contactInfo, setContactInfo] = useState({
    email: 'user@example.com',
    phone: '+1 (555) 123-4567',
  });

  const { toast } = useToast();

  const updatePreference = (category: keyof NotificationPreferences, key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your notification preferences have been updated successfully.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Notification Settings</h2>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Enable Email Notifications</Label>
              <p className="text-sm text-gray-600">Receive notifications via email</p>
            </div>
            <Switch
              checked={preferences.email.enabled}
              onCheckedChange={(checked) => updatePreference('email', 'enabled', checked)}
            />
          </div>
          
          {preferences.email.enabled && (
            <>
              <Separator />
              <div className="space-y-3">
                {[
                  { key: 'newBookings', label: 'New Booking Requests', description: 'When someone requests to book you' },
                  { key: 'statusUpdates', label: 'Booking Status Updates', description: 'When booking status changes' },
                  { key: 'payments', label: 'Payment Notifications', description: 'When payments are received or due' },
                  { key: 'reminders', label: 'Event Reminders', description: 'Reminders about upcoming events' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">{item.label}</Label>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <Switch
                      checked={preferences.email[item.key as keyof typeof preferences.email] as boolean}
                      onCheckedChange={(checked) => updatePreference('email', item.key, checked)}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* SMS Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            SMS Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Enable SMS Notifications</Label>
              <p className="text-sm text-gray-600">Receive notifications via text message</p>
            </div>
            <Switch
              checked={preferences.sms.enabled}
              onCheckedChange={(checked) => updatePreference('sms', 'enabled', checked)}
            />
          </div>
          
          {preferences.sms.enabled && (
            <>
              <Separator />
              <div className="space-y-3">
                {[
                  { key: 'urgentOnly', label: 'Urgent Only', description: 'Only high-priority notifications' },
                  { key: 'newBookings', label: 'New Bookings', description: 'New booking requests' },
                  { key: 'statusUpdates', label: 'Status Updates', description: 'Booking confirmations and changes' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">{item.label}</Label>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <Switch
                      checked={preferences.sms[item.key as keyof typeof preferences.sms] as boolean}
                      onCheckedChange={(checked) => updatePreference('sms', item.key, checked)}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Push Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Enable Push Notifications</Label>
              <p className="text-sm text-gray-600">Receive notifications in your browser</p>
            </div>
            <Switch
              checked={preferences.push.enabled}
              onCheckedChange={(checked) => updatePreference('push', 'enabled', checked)}
            />
          </div>
          
          {preferences.push.enabled && (
            <>
              <Separator />
              <div className="space-y-3">
                {[
                  { key: 'newBookings', label: 'New Bookings', description: 'New booking requests' },
                  { key: 'statusUpdates', label: 'Status Updates', description: 'Booking status changes' },
                  { key: 'payments', label: 'Payments', description: 'Payment notifications' },
                  { key: 'marketing', label: 'Marketing', description: 'Platform updates and tips' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">{item.label}</Label>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <Switch
                      checked={preferences.push[item.key as keyof typeof preferences.push] as boolean}
                      onCheckedChange={(checked) => updatePreference('push', item.key, checked)}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Notification Frequency */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Frequency</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>How often would you like to receive notifications?</Label>
            <Select 
              value={preferences.frequency} 
              onValueChange={(value: any) => setPreferences(prev => ({ ...prev, frequency: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instant">Instant</SelectItem>
                <SelectItem value="hourly">Hourly Digest</SelectItem>
                <SelectItem value="daily">Daily Digest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Quiet Hours</Label>
                <p className="text-sm text-gray-600">Pause notifications during specific hours</p>
              </div>
              <Switch
                checked={preferences.quietHours.enabled}
                onCheckedChange={(checked) => updatePreference('quietHours', 'enabled', checked)}
              />
            </div>
            
            {preferences.quietHours.enabled && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Time</Label>
                  <Input
                    type="time"
                    value={preferences.quietHours.start}
                    onChange={(e) => updatePreference('quietHours', 'start', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Time</Label>
                  <Input
                    type="time"
                    value={preferences.quietHours.end}
                    onChange={(e) => updatePreference('quietHours', 'end', e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600">
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}