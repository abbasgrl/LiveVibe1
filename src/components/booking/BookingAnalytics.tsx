import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Calendar, 
  Users,
  MapPin,
  Clock,
  Star,
  BarChart3,
  PieChart,
  Download,
  Filter,
  Target,
  Award,
  Zap
} from 'lucide-react';

interface AnalyticsData {
  totalRevenue: number;
  totalBookings: number;
  averageBookingValue: number;
  conversionRate: number;
  monthlyGrowth: number;
  topVenues: Array<{ name: string; bookings: number; revenue: number }>;
  eventTypes: Array<{ type: string; count: number; percentage: number }>;
  monthlyRevenue: Array<{ month: string; revenue: number; bookings: number }>;
  clientRetention: number;
  averageResponseTime: string;
  upcomingRevenue: number;
}

const mockAnalytics: AnalyticsData = {
  totalRevenue: 125000,
  totalBookings: 47,
  averageBookingValue: 2660,
  conversionRate: 68,
  monthlyGrowth: 23,
  topVenues: [
    { name: 'Grand Ballroom', bookings: 8, revenue: 32000 },
    { name: 'Central Park Amphitheater', bookings: 6, revenue: 28000 },
    { name: 'Seaside Resort', bookings: 5, revenue: 18000 },
    { name: 'Corporate Center', bookings: 4, revenue: 15000 },
  ],
  eventTypes: [
    { type: 'Corporate Events', count: 18, percentage: 38 },
    { type: 'Weddings', count: 12, percentage: 26 },
    { type: 'Festivals', count: 8, percentage: 17 },
    { type: 'Private Parties', count: 6, percentage: 13 },
    { type: 'Other', count: 3, percentage: 6 },
  ],
  monthlyRevenue: [
    { month: 'Jan', revenue: 18000, bookings: 7 },
    { month: 'Feb', revenue: 22000, bookings: 8 },
    { month: 'Mar', revenue: 28000, bookings: 10 },
    { month: 'Apr', revenue: 31000, bookings: 12 },
    { month: 'May', revenue: 26000, bookings: 10 },
  ],
  clientRetention: 72,
  averageResponseTime: '2.3 hours',
  upcomingRevenue: 85000,
};

export function BookingAnalytics() {
  const [analytics] = useState<AnalyticsData>(mockAnalytics);
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Track your booking performance and revenue insights</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Total Revenue</p>
                <p className="text-3xl font-bold text-green-900">
                  {formatCurrency(analytics.totalRevenue)}
                </p>
              </div>
              <div className="bg-green-200 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-700" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <div className={`flex items-center ${getGrowthColor(analytics.monthlyGrowth)}`}>
                {getGrowthIcon(analytics.monthlyGrowth)}
                <span className="ml-1 text-sm font-medium">
                  +{analytics.monthlyGrowth}% from last period
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Bookings</p>
                <p className="text-3xl font-bold text-blue-900">{analytics.totalBookings}</p>
              </div>
              <div className="bg-blue-200 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-700" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-blue-600">
                {formatCurrency(analytics.averageBookingValue)} avg. value
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Conversion Rate</p>
                <p className="text-3xl font-bold text-purple-900">{analytics.conversionRate}%</p>
              </div>
              <div className="bg-purple-200 p-3 rounded-full">
                <Target className="h-6 w-6 text-purple-700" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={analytics.conversionRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Upcoming Revenue</p>
                <p className="text-3xl font-bold text-orange-900">
                  {formatCurrency(analytics.upcomingRevenue)}
                </p>
              </div>
              <div className="bg-orange-200 p-3 rounded-full">
                <Zap className="h-6 w-6 text-orange-700" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-orange-600">From confirmed bookings</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Monthly Revenue Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.monthlyRevenue.map((month, idx) => (
                    <div key={month.month} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{month.month}</span>
                        <div className="text-right">
                          <span className="font-semibold">{formatCurrency(month.revenue)}</span>
                          <span className="text-sm text-gray-500 ml-2">({month.bookings} bookings)</span>
                        </div>
                      </div>
                      <Progress 
                        value={(month.revenue / Math.max(...analytics.monthlyRevenue.map(m => m.revenue))) * 100} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Event Types Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Event Types Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.eventTypes.map((type, idx) => (
                    <div key={type.type} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{type.type}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{type.count} events</span>
                          <Badge variant="secondary">{type.percentage}%</Badge>
                        </div>
                      </div>
                      <Progress value={type.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Venues */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Top Performing Venues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topVenues.map((venue, idx) => (
                  <div key={venue.name} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <MapPin className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{venue.name}</h4>
                        <p className="text-sm text-gray-600">{venue.bookings} bookings</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{formatCurrency(venue.revenue)}</p>
                      <p className="text-sm text-gray-500">
                        {formatCurrency(venue.revenue / venue.bookings)} avg.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(analytics.totalRevenue)}
                </p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(analytics.averageBookingValue)}
                </p>
                <p className="text-sm text-gray-600">Average Booking Value</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Zap className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency(analytics.upcomingRevenue)}
                </p>
                <p className="text-sm text-gray-600">Projected Revenue</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-lg font-bold text-green-600">85%</p>
                    <p className="text-sm text-gray-600">Completed Payments</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-lg font-bold text-yellow-600">12%</p>
                    <p className="text-sm text-gray-600">Pending Payments</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-lg font-bold text-blue-600">68%</p>
                    <p className="text-sm text-gray-600">Deposit Collected</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-lg font-bold text-purple-600">32%</p>
                    <p className="text-sm text-gray-600">Full Payment</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Client Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Client Retention Rate</span>
                  <div className="flex items-center gap-2">
                    <Progress value={analytics.clientRetention} className="w-20 h-2" />
                    <span className="font-semibold">{analytics.clientRetention}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Repeat Bookings</span>
                  <span className="font-semibold">34%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Average Response Time</span>
                  <span className="font-semibold">{analytics.averageResponseTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Client Satisfaction</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">4.8/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'TechCorp Events', bookings: 8, revenue: 32000 },
                    { name: 'Wedding Planners Inc', bookings: 6, revenue: 24000 },
                    { name: 'City Festival Committee', bookings: 4, revenue: 18000 },
                    { name: 'Corporate Solutions', bookings: 3, revenue: 15000 },
                  ].map((client, idx) => (
                    <div key={client.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{client.name}</h4>
                        <p className="text-sm text-gray-600">{client.bookings} bookings</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(client.revenue)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{analytics.conversionRate}%</p>
                <p className="text-sm text-gray-600">Conversion Rate</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{analytics.averageResponseTime}</p>
                <p className="text-sm text-gray-600">Avg Response Time</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">96%</p>
                <p className="text-sm text-gray-600">Booking Success Rate</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">4.8/5</p>
                <p className="text-sm text-gray-600">Client Rating</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-600">✅ Strengths</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      High conversion rate (68% above industry average)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Excellent client satisfaction (4.8/5 stars)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Strong revenue growth (+23% monthly)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Fast response times (2.3 hours average)
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-orange-600">🎯 Opportunities</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      Increase repeat booking rate (currently 34%)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      Expand into new event types
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      Optimize pricing for higher-value bookings
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      Develop premium service packages
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}