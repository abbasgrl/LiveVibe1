import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  Shield, 
  DollarSign, 
  Calendar,
  CheckCircle,
  Lock,
  AlertCircle,
  Receipt
} from 'lucide-react';

interface PaymentFormProps {
  bookingId: string;
  artistName: string;
  eventName: string;
  totalAmount: number;
  depositAmount: number;
  eventDate: string;
  onPaymentComplete?: (paymentData: any) => void;
}

export function PaymentForm({ 
  bookingId, 
  artistName, 
  eventName, 
  totalAmount, 
  depositAmount, 
  eventDate,
  onPaymentComplete 
}: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentType, setPaymentType] = useState<'deposit' | 'full'>('deposit');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
    zip: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const paymentAmount = paymentType === 'deposit' ? depositAmount : totalAmount;
  const remainingAmount = totalAmount - depositAmount;

  const handleCardInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === 'number') {
      // Format card number with spaces
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return; // Max 16 digits + 3 spaces
    } else if (field === 'expiry') {
      // Format expiry as MM/YY
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) return;
    } else if (field === 'cvv') {
      // Only allow numbers, max 4 digits
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) return;
    }
    
    setCardData(prev => ({ ...prev, [field]: formattedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const paymentData = {
        bookingId,
        amount: paymentAmount,
        type: paymentType,
        method: paymentMethod,
        transactionId: `txn_${Date.now()}`,
        timestamp: new Date().toISOString()
      };

      toast({
        title: "Payment Successful!",
        description: `${paymentType === 'deposit' ? 'Deposit' : 'Full payment'} of $${paymentAmount.toLocaleString()} has been processed.`,
      });

      if (onPaymentComplete) {
        onPaymentComplete(paymentData);
      }
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getCardType = (number: string) => {
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.startsWith('4')) return 'Visa';
    if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) return 'Mastercard';
    if (cleanNumber.startsWith('3')) return 'American Express';
    return 'Card';
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Booking Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Booking Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Artist:</span>
              <p className="text-gray-600">{artistName}</p>
            </div>
            <div>
              <span className="font-medium">Event:</span>
              <p className="text-gray-600">{eventName}</p>
            </div>
            <div>
              <span className="font-medium">Event Date:</span>
              <p className="text-gray-600">{eventDate}</p>
            </div>
            <div>
              <span className="font-medium">Booking ID:</span>
              <p className="text-gray-600 font-mono">{bookingId}</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Amount:</span>
              <span className="font-semibold">${totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Deposit Required:</span>
              <span className="font-semibold text-green-600">${depositAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Remaining Balance:</span>
              <span>${remainingAmount.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Payment Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                paymentType === 'deposit' 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setPaymentType('deposit')}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Pay Deposit</h3>
                <Badge variant={paymentType === 'deposit' ? 'default' : 'secondary'}>
                  Recommended
                </Badge>
              </div>
              <p className="text-2xl font-bold text-green-600">${depositAmount.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Secure your booking now</p>
            </div>
            
            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                paymentType === 'full' 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setPaymentType('full')}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Pay in Full</h3>
                <Badge variant={paymentType === 'full' ? 'default' : 'outline'}>
                  Save 5%
                </Badge>
              </div>
              <p className="text-2xl font-bold">${(totalAmount * 0.95).toLocaleString()}</p>
              <p className="text-sm text-gray-600">Complete payment</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Payment Method Selection */}
            <div className="space-y-3">
              <Label>Payment Method</Label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'card', label: 'Credit Card', icon: CreditCard },
                  { id: 'paypal', label: 'PayPal', icon: Shield },
                  { id: 'bank', label: 'Bank Transfer', icon: DollarSign }
                ].map((method) => (
                  <div
                    key={method.id}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all flex flex-col items-center gap-2 ${
                      paymentMethod === method.id 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <method.icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{method.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Credit Card Form */}
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardData.number}
                      onChange={(e) => handleCardInputChange('number', e.target.value)}
                      className="pr-16"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <span className="text-xs font-medium text-gray-500">
                        {getCardType(cardData.number)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={cardData.expiry}
                      onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cardData.cvv}
                      onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={cardData.name}
                    onChange={(e) => handleCardInputChange('name', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    placeholder="12345"
                    value={cardData.zip}
                    onChange={(e) => handleCardInputChange('zip', e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* PayPal */}
            {paymentMethod === 'paypal' && (
              <div className="text-center py-8">
                <Shield className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <p className="text-gray-600">You'll be redirected to PayPal to complete your payment</p>
              </div>
            )}

            {/* Bank Transfer */}
            {paymentMethod === 'bank' && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-900">Bank Transfer Instructions</h4>
                    <div className="text-sm text-blue-800 space-y-1">
                      <p><strong>Account:</strong> Live Vibe Payments</p>
                      <p><strong>Routing:</strong> 123456789</p>
                      <p><strong>Account:</strong> 987654321</p>
                      <p><strong>Reference:</strong> {bookingId}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Notice */}
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-green-600" />
                <div className="text-sm">
                  <p className="font-medium text-green-900">Secure Payment</p>
                  <p className="text-green-800">Your payment information is encrypted and secure</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 text-lg py-6"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing Payment...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-5 w-5" />
                  Pay ${paymentAmount.toLocaleString()} Securely
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}