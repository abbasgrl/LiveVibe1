import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingForm } from './BookingForm';
import { BookingManagement } from './BookingManagement';
import { NotificationSettings } from './NotificationSettings';
import { Calendar, Settings, Bell } from 'lucide-react';

export function BookingPage() {
  const [activeTab, setActiveTab] = useState('book');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Booking Center</h1>
          <p className="text-gray-600 mt-2">Book artists or manage your booking requests</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-lg grid-cols-3">
            <TabsTrigger value="book" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Book Artist
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Manage Bookings
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="book">
            <BookingForm />
          </TabsContent>

          <TabsContent value="manage">
            <BookingManagement />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}