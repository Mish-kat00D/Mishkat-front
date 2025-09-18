import ForgotPasswordForm from "@/components/auth/ForgetPassword"
import LoginForm from "@/components/auth/LoginForm"
import PasswordResetSuccess from "@/components/auth/PasswordResetSuccess"
import ResetPasswordForm from "@/components/auth/ResetPassword"
import SignupForm from "@/components/auth/SignupForm"
import VerifyCodeForm from "@/components/auth/VerifyCodeForm"

export async function generateStaticParams() {
  return [
    { slug: 'login' },
    { slug: 'signup' },
    { slug: 'forget-password' },
    { slug: 'verify-code' },
    { slug: 'reset-password' },
    { slug: 'reset-password-success' },
  ]
}

const Page = async (
  {
    params
  }: {
    params: Promise<{
      slug: string
    }>
  }
) => {
  const { slug } = await params;
  const action = () => {
    switch (slug) {
      case 'login':
        return <LoginForm />;
      case 'forget-password':
        return <ForgotPasswordForm />;
      case 'verify-code':
        return <VerifyCodeForm />;
      case 'reset-password':
        return <ResetPasswordForm />;
      case 'reset-password-success':
        return <PasswordResetSuccess />;
      default:
        return <SignupForm />;
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      {action()}
    </div>
  )
}

export default Page