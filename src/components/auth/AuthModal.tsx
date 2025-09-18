"use client";
import { useRouter } from "next/navigation";
import Modal from "../shared/Modal";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import ForgotPasswordForm from "./ForgetPassword";
import VerifyCodeForm from "./VerifyCodeForm";
import ResetPasswordForm from "./ResetPassword";
import PasswordResetSuccess from "./PasswordResetSuccess";

export default function AuthModal({slug}: {slug: 'login' | 'signup' | 'forget-password' | 'verify-code' | 'reset-password' | 'reset-password-success'}) {
  const router = useRouter();
  const action = () => {
    switch (slug) {
      case 'login':
        return <LoginForm />;
      case 'signup':
        return <SignupForm />;
      case 'forget-password':
        return <ForgotPasswordForm />;
      case 'verify-code':
        return <VerifyCodeForm />;
      case 'reset-password':
        return <ResetPasswordForm />;
      case 'reset-password-success':
        return <PasswordResetSuccess />;
      default:
        break;
    }
  };
  return (
    <Modal
      isOpen={true}
      onClose={() => router.back()}
    >
      {action()}
    </Modal>
  );
}
