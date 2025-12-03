"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ForgotPasswordFormProps {
  onSwitchView: (view: 'login' | 'signup' | 'forget-password' | 'verify-code' | 'reset-password' | 'reset-password-success') => void;
}

export default function ForgotPasswordForm({ onSwitchView }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Replace with your backend call for sending reset code
      console.log("Sending reset link to:", email);
      onSwitchView('verify-code');
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-primary-1000 p-6 shadow-xl outline-1 outline-indigo-600/20">
      {/* Title */}
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold text-white">Forgot Password?</h1>
        <p className="mt-2 text-sm text-neutral-300">
          No worries! Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium text-neutral-100">
          <p>
            Email Address <span className="text-red-200">*</span>
          </p>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            required
            className="rounded-md bg-primary-900 px-3 py-2 outline-1 outline-primary-100 placeholder:text-neutral-400 focus:outline-2 focus:outline-indigo-500"
          />
        </label>

        <button
          type="submit"
          className="rounded-full bg-secondary-500 px-4 py-2 font-medium text-white transition hover:bg-secondary-800"
        >
          Send Code
        </button>
      </form>

      {/* Back to Login */}
      <div className="mt-4 flex justify-center gap-2 text-sm">
        <span className="text-neutral-400">Remember your password?</span>
        <button
          type="button"
          onClick={() => onSwitchView('login')}
          className="font-bold text-white hover:text-secondary-500 hover:underline"
        >
          Back to Log In
        </button>
      </div>
    </div>
  );
}
