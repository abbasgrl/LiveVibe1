import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { format, isSameDay, isAfter, isBefore, addDays } from 'date-fns';

interface BookingEvent {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'pending' | 'blocked';
  type: 'booking' | 'personal' | 'travel';
  venue?: string;
  city?: string;
  clientName?: string;
  amount?: number;
}

interface AvailabilitySlot {
  date: Date;
  available: boolean;
  reason?: string;
  slots?: { start: string; end: string; available: boolean }[];
}

const mockEvents: BookingEvent[] = [
  {
    id: '1',
    title: 'Summer Music Festival',
    date: new Date('2024-07-15'),
    startTime: '19:00',
    endTime: '21:00',
    status: 'confirmed',
    type: 'booking',
    venue: 'Central Park',
    city: 'New York',
    clientName: 'Sarah Johnson',
    amount: 10000
  },
  {
    id: '2',
    title: 'Corporate Gala',
    date: new Date('2024-07-20'),
    startTime: '18:00',
    endTime: '22:00',
    status: 'pending',
    type: 'booking',
    venue: 'Grand Ballroom',
    city: 'Los Angeles',
    clientName: 'Michael Chen',
    amount: 8000
  },
  {
    id: '3',
    title: 'Personal Time Off',
    date: new Date('2024-07-25'),
    startTime: '00:00',
    endTime: '23:59',
    status: 'blocked',
    type: 'personal'
  },
  {
    id: '4',
    title: 'Travel Day',
    date: new Date('2024-08-01'),
    startTime: '00:00',
    endTime: '23:59',
    status: 'blocked',
    type: 'travel'
  }
];

export function AvailabilityCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<BookingEvent[]>(mockEvents);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedArtist, setSelectedArtist] = useState('all');
  const { toast } = useToast();

  const getEventsByDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'blocked': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'booking': return <CalendarIcon className="h-4 w-4" />;
      case 'personal': return <Users className="h-4 w-4" />;
      case 'travel': return <MapPin className="h-4 w-4" />;
      default: return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const isDateAvailable = (date: Date) => {
    const dayEvents = getEventsByDate(date);
    return !dayEvents.some(event => event.status === 'blocked' || event.status === 'confirmed');
  };

  const getDayModifiers = () => {
    const modifiers: any = {};
    
    events.forEach(event => {
      const dateKey = format(event.date, 'yyyy-MM-dd');
      if (event.status === 'confirmed') {
        modifiers[`confirmed-${dateKey}`] = event.date;
      } else if (event.status === 'pending') {
        modifiers[`pending-${dateKey}`] = event.date;
      } else if (event.status === 'blocked') {
        modifiers[`blocked-${dateKey}`] = event.date;
      }
    });

    return modifiers;
  };

  const handleBlockDate = (date: Date, reason: string) => {
    const newEvent: BookingEvent = {
      id: Date.now().toString(),
      title: reason,
      date,
      startTime: '00:00',
      endTime: '23:59',
      status: 'blocked',
      type: reason.toLowerCase().includes('travel') ? 'travel' : 'personal'
    };

    setEvents(prev => [...prev, newEvent]);
    toast({
      title: "Date Blocked",
      description: `${format(date, 'MMM dd, yyyy')} has been marked as unavailable.`,
    });
  };

  const handleUnblockDate = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    toast({
      title: "Date Unblocked",
      description: "The date is now available for bookings.",
    });
  };

  const selectedDateEvents = selectedDate ? getEventsByDate(selectedDate) : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Calendar & Availability</h2>
          <p className="text-gray-600">Manage your schedule and availability</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedArtist} onValueChange={setSelectedArtist}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select artist" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Artists</SelectItem>
              <SelectItem value="luna">Luna Martinez</SelectItem>
              <SelectItem value="marcus">Marcus Thunder</SelectItem>
              <SelectItem value="indie">Indie Collective</SelectItem>
            </SelectContent>
          </Select>
          <Select value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Schedule Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Legend */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Confirmed Booking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Pending Booking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Unavailable</span>
                  </div>
                </div>

                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  modifiers={getDayModifiers()}
                  modifiersStyles={{
                    confirmed: { backgroundColor: '#dbeafe', color: '#1e40af' },
                    pending: { backgroundColor: '#fef3c7', color: '#d97706' },
                    blocked: { backgroundColor: '#fee2e2', color: '#dc2626' }
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Date Details */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>
                  {selectedDate ? format(selectedDate, 'MMM dd, yyyy') : 'Select a date'}
                </span>
                {selectedDate && isDateAvailable(selectedDate) && (
                  <Badge className="bg-green-100 text-green-800">Available</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedDate && (
                <>
                  {selectedDateEvents.length === 0 ? (
                    <div className="text-center py-6">
                      <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">No events scheduled</p>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="mt-2"
                        onClick={() => handleBlockDate(selectedDate, 'Personal Time Off')}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Block Date
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedDateEvents.map((event) => (
                        <div key={event.id} className={`p-3 rounded-lg border ${getStatusColor(event.status)}`}>
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-2">
                              {getTypeIcon(event.type)}
                              <div className="min-w-0 flex-1">
                                <h4 className="font-medium text-sm">{event.title}</h4>
                                <div className="flex items-center gap-1 text-xs mt-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{event.startTime} - {event.endTime}</span>
                                </div>
                                {event.venue && (
                                  <div className="flex items-center gap-1 text-xs mt-1">
                                    <MapPin className="h-3 w-3" />
                                    <span>{event.venue}, {event.city}</span>
                                  </div>
                                )}
                                {event.amount && (
                                  <div className="text-xs font-medium mt-1">
                                    ${event.amount.toLocaleString()}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-1">
                              {event.status === 'blocked' && (
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-6 w-6"
                                  onClick={() => handleUnblockDate(event.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => selectedDate && handleBlockDate(selectedDate, 'Personal Time Off')}
                disabled={!selectedDate}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Block Selected Date
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => selectedDate && handleBlockDate(selectedDate, 'Travel Day')}
                disabled={!selectedDate}
              >
                <MapPin className="mr-2 h-4 w-4" />
                Mark as Travel Day
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full justify-start"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Custom Event
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {events
              .filter(event => isAfter(event.date, new Date()) || isSameDay(event.date, new Date()))
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .slice(0, 5)
              .map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center text-center min-w-[60px]">
                      <span className="text-sm font-medium">{format(event.date, 'MMM')}</span>
                      <span className="text-lg font-bold">{format(event.date, 'dd')}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>
                        {event.venue && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{event.venue}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {event.amount && (
                      <span className="font-semibold text-green-600">
                        ${event.amount.toLocaleString()}
                      </span>
                    )}
                    <Badge className={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}