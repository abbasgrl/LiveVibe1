import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookingForm } from './BookingForm';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  artistId?: string;
  artistName?: string;
  artistGenre?: string;
  artistPrice?: string;
}

export function BookingModal({ 
  isOpen, 
  onClose, 
  artistId, 
  artistName, 
  artistGenre, 
  artistPrice 
}: BookingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Book Artist</DialogTitle>
        </DialogHeader>
        <BookingForm
          artistId={artistId}
          artistName={artistName}
          artistGenre={artistGenre}
          artistPrice={artistPrice}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}