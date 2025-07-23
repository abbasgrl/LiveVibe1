import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  Clock, 
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  MessageSquare
} from 'lucide-react';
import { format } from 'date-fns';

interface Booking {
  id: string;
  eventName: string;
  eventType: string;
  date: Date;
  startTime: string;
  endTime: string;
  venue: string;
  city: string;
  state: string;
  expectedAttendees: number;
  budget: string;
  status: 'pending' | 'confirmed' | 'declined' | 'completed';
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  description: string;
  artistName?: string;
  artistGenre?: string;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    eventName: 'Summer Music Festival',
    eventType: 'Festival',
    date: new Date('2024-07-15'),
    startTime: '19:00',
    endTime: '21:00',
    venue: 'Central Park Amphitheater',
    city: 'New York',
    state: 'NY',
    expectedAttendees: 2000,
    budget: '10000-25000',
    status: 'pending',
    contactName: 'Sarah Johnson',
    contactEmail: 'sarah@musicfest.com',
    contactPhone: '(555) 123-4567',
    description: 'Annual summer music festival featuring multiple genres',
    artistName: 'Luna Martinez',
    artistGenre: 'Pop/R&B'
  },
  {
    id: '2',
    eventName: 'Corporate Gala',
    eventType: 'Corporate Event',
    date: new Date('2024-06-20'),
    startTime: '18:00',
    endTime: '22:00',
    venue: 'Grand Ballroom',
    city: 'Los Angeles',
    state: 'CA',
    expectedAttendees: 500,
    budget: '5000-10000',
    status: 'confirmed',
    contactName: 'Michael Chen',
    contactEmail: 'michael@techcorp.com',
    contactPhone: '(555) 987-6543',
    description: 'Annual company celebration with live entertainment',
    artistName: 'Marcus Thunder',
    artistGenre: 'Hip-Hop/Rap'
  },
  {
    id: '3',
    eventName: 'Wedding Reception',
    eventType: 'Wedding',
    date: new Date('2024-08-10'),
    startTime: '17:00',
    endTime: '23:00',
    venue: 'Seaside Resort',
    city: 'Miami',
    state: 'FL',
    expectedAttendees: 150,
    budget: '2500-5000',
    status: 'completed',
    contactName: 'Emily Rodriguez',
    contactEmail: 'emily@email.com',
    contactPhone: '(555) 456-7890',
    description: 'Romantic beachside wedding reception',
    artistName: 'Indie Collective',
    artistGenre: 'Alternative Rock'
  }
];

export function BookingManagement() {
  const [bookings] = useState<Booking[]>(mockBookings);
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'declined': return <XCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.contactName.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedTab === 'all') return matchesSearch;
    return matchesSearch && booking.status === selectedTab;
  });

  const getBookingCounts = () => {
    return {
      all: bookings.length,
      pending: bookings.filter(b => b.status === 'pending').length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      completed: bookings.filter(b => b.status === 'completed').length,
      declined: bookings.filter(b => b.status === 'declined').length
    };
  };

  const counts = getBookingCounts();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Booking Management</h2>
          <p className="text-gray-600">Manage your event bookings and requests</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all" className="flex items-center gap-2">
            All ({counts.all})
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            Pending ({counts.pending})
          </TabsTrigger>
          <TabsTrigger value="confirmed" className="flex items-center gap-2">
            Confirmed ({counts.confirmed})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            Completed ({counts.completed})
          </TabsTrigger>
          <TabsTrigger value="declined" className="flex items-center gap-2">
            Declined ({counts.declined})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {filteredBookings.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
                <p className="text-gray-600">
                  {searchTerm ? 'Try adjusting your search terms' : 'No bookings match the selected filter'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredBookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{booking.eventName}</h3>
                            <p className="text-gray-600">{booking.eventType}</p>
                          </div>
                          <Badge className={`${getStatusColor(booking.status)} flex items-center gap-1`}>
                            {getStatusIcon(booking.status)}
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>{format(booking.date, 'MMM dd, yyyy')}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>{booking.startTime} - {booking.endTime}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{booking.city}, {booking.state}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="h-4 w-4" />
                            <span>{booking.expectedAttendees.toLocaleString()} attendees</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium">Venue:</span> {booking.venue}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Contact:</span> {booking.contactName} ({booking.contactEmail})
                          </div>
                          {booking.artistName && (
                            <div className="text-sm">
                              <span className="font-medium">Artist:</span> {booking.artistName} - {booking.artistGenre}
                            </div>
                          )}
                        </div>

                        {booking.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">{booking.description}</p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 min-w-[120px]">
                        <Button size="sm" variant="outline" className="w-full">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                        {booking.status === 'pending' && (
                          <>
                            <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Accept
                            </Button>
                            <Button size="sm" variant="destructive" className="w-full">
                              <XCircle className="mr-2 h-4 w-4" />
                              Decline
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}