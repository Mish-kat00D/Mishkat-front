"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ResetPasswordFormProps {
  onSwitchView: (view: 'login' | 'signup' | 'forget-password' | 'verify-code' | 'reset-password' | 'reset-password-success') => void;
}

export default function ResetPasswordForm({ onSwitchView }: ResetPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
    }
    onSwitchView('reset-password-success');
    console.log("Reset successful:", password);
  };

  return (
    <div className="w-full max-w-md bg-primary-1000 rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white">Reset Your Password</h1>
        <p className="text-sm text-neutral-300 mt-1">
          Set a new password to secure your account and continue with Mishkat
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* New Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-neutral-100">
            New Password <span className="text-Red-200">*</span>
          </label>
          <input
            type="password"
            placeholder="Enter a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 rounded-md bg-primary-900 outline-1 outline-primary-100 text-white placeholder:text-neutral-400"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-neutral-100">
            Confirm New Password <span className="text-Red-200">*</span>
          </label>
          <input
            type="password"
            placeholder="Re-enter your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-3 py-2 rounded-md bg-primary-900 outline-1 outline-primary-100 text-white placeholder:text-neutral-400"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 rounded-full bg-secondary-500 hover:bg-secondary-800 text-white font-semibold mt-2"
        >
          Reset Password
        </button>
      </form>

      {/* Footer */}
      <div className="flex justify-center gap-2 mt-4 text-sm">
        <span className="text-neutral-400">Don’t have an account?</span>
        <button type="button" onClick={() => onSwitchView('signup')} className="text-white font-bold hover:text-secondary-500 hover:underline">
          Sign Up
        </button>
      </div>
    </div>
  );
}
