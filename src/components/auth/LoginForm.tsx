"use client";
import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  onSwitchView: (view: 'login' | 'signup' | 'forget-password' | 'verify-code' | 'reset-password' | 'reset-password-success') => void;
  onClose: () => void;
}

export default function LoginForm({ onSwitchView, onClose }: LoginFormProps) {
  const router = useRouter();
  const { login, loading, error: authError, getProfile } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    try {
      await login(form);
      await getProfile();
      onClose();
      if (window.location.pathname === "/") {
        window.location.reload();
      } else {
        router.push("/");
      }
    } catch (err: any) {
      console.log(err.message);
      setLocalError(err.message || "Failed to login");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  return (
    <div className="w-full max-w-md rounded-2xl bg-primary-1000 p-6 shadow-xl outline-1 outline-indigo-600/20">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold text-white">Welcome back to Mishkat</h1>
        <p className="mt-1 text-sm text-neutral-300">

        </p>
      </div>

      {/* Google Auth */}
      <Link
        href={`${process.env.NEXT_PUBLIC_API_URL ?? 'https://mish-kat.org/api'}/auth/google`}
        className="mb-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-1000 px-4 py-2 shadow-md outline-1 outline-indigo-600/20 transition hover:bg-primary-900"
      >
        <Image src="/Google.svg" alt="Google Logo" width={32} height={32} />
        <span className="text-base font-bold text-neutral-200">Continue with Google</span>
      </Link>

      {/* Divider */}
      <div className="mb-4 flex items-center gap-2">
        <div className="h-px flex-1 bg-neutral-200" />
        <span className="text-sm font-medium text-neutral-500">or login with email</span>
        <div className="h-px flex-1 bg-neutral-200" />
      </div>

      {(localError || (authError && authError !== "Unauthorized")) && (
        <div className="mb-4 rounded-md bg-red-500/10 p-3 text-sm text-red-500">
          {localError || authError}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <button type="button" onClick={() => onSwitchView('forget-password')} className="text-sm text-white font-semibold mt-1 leading-tight text-end hover:underline">Forget Password?</button>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-secondary-500 px-4 py-2 font-medium text-white transition hover:bg-secondary-800"
        >
          Log In
        </button>
      </form>

      <div className="mt-4 flex justify-center gap-2 text-sm">
        <span className="text-neutral-400">Don't have an account?</span>
        <button type="button" onClick={() => onSwitchView('signup')} className="font-bold text-white hover:text-secondary-500 hover:underline">
          Sign Up
        </button>
      </div>
    </div>
  );
}
