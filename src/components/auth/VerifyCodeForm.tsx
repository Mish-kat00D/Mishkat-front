"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VerifyCodeForm() {
  const length = 6;
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement>>([]);
  const router = useRouter();

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return; // Only digits allowed
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input if a digit is entered
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otp = code.join("");
    try {
      // TODO: Replace with your backend API call
      console.log("Submitting code:", otp);
      router.push("/auth/reset-password");
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
          Please enter the code below to continue resetting your password.
        </p>
      </div>

      {/* OTP Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 text-sm font-medium text-neutral-100">
          <p>
            Enter Code <span className="text-red-200">*</span>
          </p>
          <div className="flex justify-center gap-2 pt-1">
            {code.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                ref={((el: HTMLInputElement) => (inputsRef.current[idx] = el)) as any as undefined}
                className="h-12 w-12 rounded-md bg-primary-900 text-center text-lg font-semibold text-white outline-1 outline-indigo-300/30 focus:outline-2 focus:outline-indigo-500"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="rounded-full bg-secondary-500 px-4 py-2 font-medium text-white transition hover:bg-secondary-800"
        >
          Submit
        </button>
      </form>

      {/* Back to Login */}
      <div className="mt-4 flex justify-center gap-2 text-sm">
        <span className="text-neutral-400">Remember your password?</span>
        <Link
          href="/auth/login"
          replace
          className="font-bold text-white hover:text-secondary-500"
        >
          Back to Log In
        </Link>
      </div>
    </div>
  );
}
