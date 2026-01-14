"use client";
import { useAuth } from '@/lib/hooks/useAuth';
import { useAuthUI } from '@/lib/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface SignupFormProps {
  onSwitchView: (view: 'login' | 'signup' | 'forget-password' | 'verify-code' | 'reset-password' | 'reset-password-success') => void;
}

const SignupForm = ({ onSwitchView }: SignupFormProps) => {
  const { register, error: authError } = useAuth();
  const [localError, setLocalError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (form.password !== form.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }
    try {
      await register({
        email: form.email,
        password: form.password,
        name: form.name,
      });
      // Redirect or show success message? Usually auto-login or switch to login
      onSwitchView('login');
    } catch (err: any) {
      console.log(err.message);
      setLocalError(err.message || "Failed to register");
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-primary-1000 p-6 shadow-xl outline-1 outline-indigo-600/20">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold text-white">Create your Mishkat account</h1>
        <p className="mt-1 text-sm text-neutral-300">
          Join thousands of architects transforming their practice
        </p>
      </div>

      {/* Google Auth */}
      <button
        type="button"
        className="mb-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-1000 px-4 py-2 shadow-md outline-1 outline-indigo-600/20 transition hover:bg-primary-900"
      >
        <Image src="/Google.svg" alt="Google Logo" width={32} height={32} />
        <span className="text-base font-bold text-neutral-200">Continue with Google</span>
      </button>

      {/* Divider */}
      <div className="mb-4 flex items-center gap-2">
        <div className="h-px flex-1 bg-neutral-200" />
        <span className="text-sm font-medium text-neutral-500">or sign up with email</span>
        <div className="h-px flex-1 bg-neutral-200" />
      </div>

      {(localError || authError) && (
        <div className="mb-4 rounded-md bg-red-500/10 p-3 text-sm text-red-500">
          {localError || authError}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium text-neutral-100">
          <p>Full Name <span className="text-red-200">*</span></p>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter Your Full Name"
            required
            className="rounded-md bg-primary-900 px-3 py-2 outline-1 outline-primary-100 placeholder:text-neutral-400 focus:outline-2 focus:outline-indigo-500"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-neutral-100">
          <p>Email Address <span className="text-red-200">*</span></p>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter Your Email"
            required
            className="rounded-md bg-primary-900 px-3 py-2 outline-1 outline-primary-100 placeholder:text-neutral-400 focus:outline-2 focus:outline-indigo-500"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-neutral-100">
          <p>Password <span className="text-red-200">*</span></p>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a Password"
            required
            className="rounded-md bg-primary-900 px-3 py-2 outline-1 outline-primary-100 placeholder:text-neutral-400 focus:outline-2 focus:outline-indigo-500"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-neutral-100">
          <p>Confirm Password <span className="text-red-200">*</span></p>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Your Password"
            required
            className="rounded-md bg-primary-900 px-3 py-2 outline-1 outline-primary-100 placeholder:text-neutral-400 focus:outline-2 focus:outline-indigo-500"
          />
        </label>

        <button
          type="submit"
          className="rounded-full bg-secondary-500 px-4 py-2 font-medium text-white transition hover:bg-secondary-600"
        >
          Sign Up
        </button>
      </form>

      <div className="mt-4 flex justify-center gap-2 text-sm">
        <span className="text-neutral-400">Already have an account?</span>
        <button type="button" onClick={() => onSwitchView('login')} className="font-bold text-white hover:underline">
          Log In
        </button>
      </div>
    </div>
  );
}

export default SignupForm