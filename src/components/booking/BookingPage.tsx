import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingForm } from './BookingForm';
import { BookingManagement } from './BookingManagement';
import { NotificationSettings } from './NotificationSettings';
import { PaymentTracking } from './PaymentTracking';
import { AvailabilityCalendar } from './AvailabilityCalendar';
import { BookingAnalytics } from './BookingAnalytics';
import { ContractManagement } from './ContractManagement';
import { Calendar, Settings, Bell, DollarSign, BarChart3, FileText } from 'lucide-react';

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
          <TabsList className="grid w-full max-w-5xl grid-cols-7">
            <TabsTrigger value="book" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Book Artist
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Manage Bookings
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="contracts" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Contracts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="book">
            <BookingForm />
          </TabsContent>

          <TabsContent value="manage">
            <BookingManagement />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentTracking />
          </TabsContent>

          <TabsContent value="calendar">
            <AvailabilityCalendar />
          </TabsContent>

          <TabsContent value="notifications">
            <div className="bg-white rounded-lg p-6">
              <NotificationSettings />
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <BookingAnalytics />
          </TabsContent>

          <TabsContent value="contracts">
            <ContractManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}