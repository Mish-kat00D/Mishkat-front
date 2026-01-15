'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, X, CreditCard, Lock } from 'lucide-react';
import { Workshop } from '@/types/workshop';
import { useAuth } from '@/lib/hooks/useAuth';

interface BookingModalProps {
  workshop: Workshop;
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ workshop, isOpen, onClose }: BookingModalProps) => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleBooking = async () => {
    if (!user) {
      // If user is not logged in, redirect to login page with return URL
      // Assuming structure for login redirect, or just simple push
      router.push(`/auth/login?returnUrl=/workshop/${workshop.slug}`);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Using fetch directly as in useAuth or similar pattern.
      // Ideally we should use a shared axios/fetch instance but sticking to what I saw in useAuth/EditProfileModal
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      // Need credentials 'include' for cookies if Auth uses cookies
      const response = await fetch(`${API_URL}/payments/workshop/${workshop.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}` // If using Bearer, but looked like 'credentials: include' in useAuth
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to initiate payment');
      }

      const data = await response.json();

      if (data.iframeUrl) {
        window.location.href = data.iframeUrl;
      } else {
        throw new Error('Invalid payment response');
      }

    } catch (err: any) {
      console.error('Payment Error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-primary-900 rounded-3xl w-full max-w-md shadow-2xl border border-white/10 overflow-hidden scale-100 animate-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-primary-800/50">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Confirm Booking</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-6">

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
              {workshop.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {workshop.subtitle || workshop.description}
            </p>
          </div>

          <div className="p-4 bg-secondary-500/5 rounded-2xl border border-secondary-500/20 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300 font-medium">Price</span>
              <span className="text-xl font-bold text-secondary-500">
                {workshop.price} {workshop.currency}
              </span>
            </div>
            {/* Add more details if needed, e.g. tax, total */}
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={handleBooking}
              disabled={isLoading || authLoading}
              className="w-full py-3.5 px-6 bg-secondary-500 hover:bg-secondary-600 disabled:opacity-70 disabled:cursor-not-allowed rounded-xl text-white font-bold text-lg shadow-lg shadow-secondary-500/25 transition-all active:scale-[0.98] flex justify-center items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Pay with Card
                </>
              )}
            </button>

            <div className="flex justify-center items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
              <Lock className="w-3 h-3" />
              <span>Secure payment via XPay</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingModal;
