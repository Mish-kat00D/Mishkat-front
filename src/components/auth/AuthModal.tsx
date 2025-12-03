"use client";
import { useState, useEffect } from "react";
import Modal from "../shared/Modal";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import ForgotPasswordForm from "./ForgetPassword";
import VerifyCodeForm from "./VerifyCodeForm";
import ResetPasswordForm from "./ResetPassword";
import PasswordResetSuccess from "./PasswordResetSuccess";

type AuthView = 'login' | 'signup' | 'forget-password' | 'verify-code' | 'reset-password' | 'reset-password-success';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: AuthView;
}

export default function AuthModal({ isOpen, onClose, initialView = 'login' }: AuthModalProps) {
  const [view, setView] = useState<AuthView>(initialView);

  useEffect(() => {
    if (isOpen) {
      setView(initialView);
    }
  }, [isOpen, initialView]);

  const handleSwitchView = (newView: AuthView) => {
    setView(newView);
  };

  const renderContent = () => {
    switch (view) {
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
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      {renderContent()}
    </Modal>
  );
}
