import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  Bell, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Calendar,
  User,
  X,
  Settings,
  Mail,
  MessageSquare
} from 'lucide-react';
import { format } from 'date-fns';

interface Notification {
  id: string;
  type: 'booking_confirmed' | 'booking_declined' | 'booking_updated' | 'new_booking' | 'payment_received';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  bookingId: string;
  priority: 'low' | 'medium' | 'high';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'booking_confirmed',
    title: 'Booking Confirmed!',
    message: 'Your booking for Summer Music Festival has been confirmed by Luna Martinez',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
    bookingId: '1',
    priority: 'high'
  },
  {
    id: '2',
    type: 'new_booking',
    title: 'New Booking Request',
    message: 'You have a new booking request for Corporate Gala from Michael Chen',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: false,
    bookingId: '2',
    priority: 'medium'
  },
  {
    id: '3',
    type: 'booking_updated',
    title: 'Booking Updated',
    message: 'Wedding Reception booking details have been updated',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: true,
    bookingId: '3',
    priority: 'low'
  },
  {
    id: '4',
    type: 'payment_received',
    title: 'Payment Received',
    message: 'Payment of $5,000 received for Corporate Gala booking',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
    bookingId: '2',
    priority: 'medium'
  }
];

interface BookingNotificationsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingNotifications({ isOpen, onClose }: BookingNotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const { toast } = useToast();

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new notifications (for demo purposes)
      if (Math.random() < 0.1) { // 10% chance every 5 seconds
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: 'new_booking',
          title: 'New Booking Request',
          message: `New booking request from ${['Sarah Johnson', 'Mike Davis', 'Emma Wilson'][Math.floor(Math.random() * 3)]}`,
          timestamp: new Date(),
          read: false,
          bookingId: Date.now().toString(),
          priority: 'medium'
        };
        
        setNotifications(prev => [newNotification, ...prev]);
        
        // Show toast notification
        toast({
          title: "New Booking Request",
          description: newNotification.message,
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [toast]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking_confirmed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'booking_declined': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'new_booking': return <Calendar className="h-5 w-5 text-blue-600" />;
      case 'booking_updated': return <Clock className="h-5 w-5 text-orange-600" />;
      case 'payment_received': return <CheckCircle className="h-5 w-5 text-green-600" />;
      default: return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-orange-500';
      case 'low': return 'border-l-blue-500';
      default: return 'border-l-gray-500';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => 
    filter === 'all' || !notif.read
  );

  const unreadCount = notifications.filter(notif => !notif.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-end p-4">
      <Card className="w-full max-w-md h-[600px] bg-white shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setFilter(filter === 'all' ? 'unread' : 'all')}>
              {filter === 'all' ? 'Show Unread' : 'Show All'}
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-4 border-b">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={markAllAsRead}>
              Mark All Read
            </Button>
            <Button size="sm" variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No notifications</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border-l-4 ${getPriorityColor(notification.priority)} ${
                    notification.read ? 'bg-gray-50' : 'bg-blue-50'
                  } hover:shadow-md transition-shadow cursor-pointer`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className={`text-sm font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                          {notification.title}
                        </h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-gray-400 hover:text-gray-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className={`text-xs mt-1 ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-400">
                          {format(notification.timestamp, 'MMM dd, HH:mm')}
                        </span>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MessageSquare className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Mail className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}