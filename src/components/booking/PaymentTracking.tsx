import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Receipt,
  Download,
  CreditCard,
  TrendingUp
} from 'lucide-react';
import { format } from 'date-fns';

interface Payment {
  id: string;
  bookingId: string;
  artistName: string;
  eventName: string;
  amount: number;
  type: 'deposit' | 'full' | 'balance';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'card' | 'paypal' | 'bank';
  transactionId: string;
  date: Date;
  dueDate?: Date;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    bookingId: 'BK001',
    artistName: 'Luna Martinez',
    eventName: 'Summer Music Festival',
    amount: 2500,
    type: 'deposit',
    status: 'completed',
    method: 'card',
    transactionId: 'txn_1234567890',
    date: new Date('2024-01-15'),
  },
  {
    id: '2',
    bookingId: 'BK001',
    artistName: 'Luna Martinez',
    eventName: 'Summer Music Festival',
    amount: 7500,
    type: 'balance',
    status: 'pending',
    method: 'card',
    transactionId: 'txn_pending',
    date: new Date('2024-01-15'),
    dueDate: new Date('2024-07-01'),
  },
  {
    id: '3',
    bookingId: 'BK002',
    artistName: 'Marcus Thunder',
    eventName: 'Corporate Gala',
    amount: 5000,
    type: 'full',
    status: 'completed',
    method: 'paypal',
    transactionId: 'txn_0987654321',
    date: new Date('2024-01-10'),
  },
];

export function PaymentTracking() {
  const [payments] = useState<Payment[]>(mockPayments);
  const [selectedTab, setSelectedTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'failed': return <AlertCircle className="h-4 w-4" />;
      case 'refunded': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'card': return <CreditCard className="h-4 w-4" />;
      case 'paypal': return <DollarSign className="h-4 w-4" />;
      case 'bank': return <DollarSign className="h-4 w-4" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingPayments = payments.filter(p => p.status === 'pending');
  const completedPayments = payments.filter(p => p.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Tracking</h2>
          <p className="text-gray-600">Monitor payments and revenue</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payments">All Payments</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Revenue Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-3xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +12% from last month
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                    <p className="text-3xl font-bold text-yellow-600">
                      ${pendingPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">{pendingPayments.length} payments pending</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-3xl font-bold text-blue-600">{completedPayments.length}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">This month</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Payments */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payments.slice(0, 5).map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-100 p-2 rounded-full">
                        {getMethodIcon(payment.method)}
                      </div>
                      <div>
                        <h4 className="font-medium">{payment.eventName}</h4>
                        <p className="text-sm text-gray-600">{payment.artistName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${payment.amount.toLocaleString()}</p>
                      <Badge className={`${getStatusColor(payment.status)} flex items-center gap-1 mt-1`}>
                        {getStatusIcon(payment.status)}
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          {payments.map((payment) => (
            <Card key={payment.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{payment.eventName}</h3>
                        <p className="text-gray-600">{payment.artistName}</p>
                      </div>
                      <Badge className={`${getStatusColor(payment.status)} flex items-center gap-1`}>
                        {getStatusIcon(payment.status)}
                        {payment.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Amount:</span>
                        <p className="text-lg font-bold">${payment.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="font-medium">Type:</span>
                        <p className="capitalize">{payment.type}</p>
                      </div>
                      <div>
                        <span className="font-medium">Method:</span>
                        <p className="capitalize flex items-center gap-1">
                          {getMethodIcon(payment.method)}
                          {payment.method}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Date:</span>
                        <p>{format(payment.date, 'MMM dd, yyyy')}</p>
                      </div>
                    </div>

                    {payment.dueDate && (
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-yellow-800">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">
                            Due: {format(payment.dueDate, 'MMM dd, yyyy')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 min-w-[120px]">
                    <Button size="sm" variant="outline">
                      <Receipt className="mr-2 h-4 w-4" />
                      View Receipt
                    </Button>
                    {payment.status === 'pending' && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <DollarSign className="mr-2 h-4 w-4" />
                        Pay Now
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingPayments.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">All caught up!</h3>
                <p className="text-gray-600">No pending payments at the moment.</p>
              </CardContent>
            </Card>
          ) : (
            pendingPayments.map((payment) => (
              <Card key={payment.id} className="border-l-4 border-l-yellow-500">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold">{payment.eventName}</h3>
                        <p className="text-gray-600">{payment.artistName}</p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Amount Due:</span>
                          <p className="text-xl font-bold text-yellow-600">${payment.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="font-medium">Type:</span>
                          <p className="capitalize">{payment.type} Payment</p>
                        </div>
                        {payment.dueDate && (
                          <div>
                            <span className="font-medium">Due Date:</span>
                            <p>{format(payment.dueDate, 'MMM dd, yyyy')}</p>
                          </div>
                        )}
                      </div>

                      {payment.dueDate && (
                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <div className="flex items-center gap-2 text-yellow-800">
                            <AlertCircle className="h-4 w-4" />
                            <span className="text-sm">
                              Payment due in {Math.ceil((payment.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 min-w-[120px]">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <DollarSign className="mr-2 h-4 w-4" />
                        Pay Now
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule Payment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}