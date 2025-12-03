"use client";

import { useRouter } from "next/navigation";
import ForgotPasswordForm from "@/components/auth/ForgetPassword";
import LoginForm from "@/components/auth/LoginForm";
import PasswordResetSuccess from "@/components/auth/PasswordResetSuccess";
import ResetPasswordForm from "@/components/auth/ResetPassword";
import SignupForm from "@/components/auth/SignupForm";
import VerifyCodeForm from "@/components/auth/VerifyCodeForm";

export default function AuthPageClient({ slug }: { slug: string }) {
  const router = useRouter();

  const handleSwitchView = (view: string) => {
    router.push(`/auth/${view}`);
  };

  switch (slug) {
    case 'login':
      return <LoginForm onSwitchView={handleSwitchView} />;
    case 'signup':
      return <SignupForm onSwitchView={handleSwitchView} />;
    case 'forget-password':
      return <ForgotPasswordForm onSwitchView={handleSwitchView} />;
    case 'verify-code':
      return <VerifyCodeForm onSwitchView={handleSwitchView} />;
    case 'reset-password':
      return <ResetPasswordForm onSwitchView={handleSwitchView} />;
    case 'reset-password-success':
      return <PasswordResetSuccess onSwitchView={handleSwitchView} />;
    default:
      return <SignupForm onSwitchView={handleSwitchView} />;
  }
}
