"use client"
import { useState } from 'react';
import BookingModal from './BookingModal';
import Link from 'next/link';
import { Workshop } from '@/types/workshop';

const BookButton = ({ isUser, enrolled, workshop }: { isUser: boolean, enrolled: boolean, workshop: Workshop }) => {
  const firstSessionId = workshop.sessions[0].id;
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  if (!isUser) {
    return (
      <Link href="/auth/login">
        <button
          className='w-full py-3 px-6 bg-secondary-500 rounded-full text-white font-bold text-lg mt-6 hover:bg-secondary-600 transition-colors'
        >
          Sign In to Book Now
        </button>
      </Link>
    )
  }

  if (enrolled) {
    if (!firstSessionId) {
      return (
        <button
          className='w-full py-3 px-6 bg-secondary-500 rounded-full text-white font-bold text-lg mt-6 hover:bg-secondary-600 transition-colors'
        >
          Workshop is not available
        </button>
      )
    }
    return (
      <Link href={`/workshop/${workshop.id}/watch/${firstSessionId}`}>
        <button
          className='w-full py-3 px-6 bg-secondary-500 rounded-full text-white font-bold text-lg mt-6 hover:bg-secondary-600 transition-colors'
        >
          Complete Your Journey
        </button>
      </Link>
    )
  }
  return (
    <>
      <button
        onClick={() => setIsBookingModalOpen(true)}
        className='w-full py-3 px-6 bg-secondary-500 rounded-full text-white font-bold text-lg mt-6 hover:bg-secondary-600 transition-colors'
      >
        Book Now
      </button>
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        workshop={workshop}
      />
    </>
  )
}

export default BookButton