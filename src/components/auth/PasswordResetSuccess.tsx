"use client";
import { useRouter } from "next/navigation";

interface PasswordResetSuccessProps {
  onSwitchView: (view: 'login' | 'signup' | 'forget-password' | 'verify-code' | 'reset-password' | 'reset-password-success') => void;
}

export default function PasswordResetSuccess({ onSwitchView }: PasswordResetSuccessProps) {

  const handleOk = () => {
    onSwitchView('login'); // redirect to login after reset
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-primary-1000 p-6 shadow-xl outline-1 outline-indigo-600/20 flex flex-col items-center gap-6">
      {/* Icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 111.414-1.414L8.414 12.172l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Text */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-neutral-100">
          Your password has been successfully updated
        </h2>
        <p className="mt-2 text-sm text-neutral-300">
          You can now log in with your new password.
        </p>
      </div>

      {/* Button */}
      <button
        onClick={handleOk}
        className="w-full rounded-md bg-secondary-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-secondary-600"
      >
        OK
      </button>
    </div>
  );
}
