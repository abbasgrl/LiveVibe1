import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PaymentForm } from './PaymentForm';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  artistName: string;
  eventName: string;
  totalAmount: number;
  depositAmount: number;
  eventDate: string;
}

export function PaymentModal({ 
  isOpen, 
  onClose, 
  bookingId,
  artistName,
  eventName,
  totalAmount,
  depositAmount,
  eventDate
}: PaymentModalProps) {
  const handlePaymentComplete = (paymentData: any) => {
    console.log('Payment completed:', paymentData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Payment</DialogTitle>
        </DialogHeader>
        <PaymentForm
          bookingId={bookingId}
          artistName={artistName}
          eventName={eventName}
          totalAmount={totalAmount}
          depositAmount={depositAmount}
          eventDate={eventDate}
          onPaymentComplete={handlePaymentComplete}
        />
      </DialogContent>
    </Dialog>
  );
}