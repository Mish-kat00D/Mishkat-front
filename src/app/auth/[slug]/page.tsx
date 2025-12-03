import AuthPageClient from "./AuthPageClient";

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

  return (
    <div className="flex items-center justify-center min-h-screen">
      <AuthPageClient slug={slug} />
    </div>
  )
}

export default Page