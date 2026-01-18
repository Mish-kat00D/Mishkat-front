import AuthGuard from '@/components/guards/AuthGuard'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </AuthGuard>
  )
}

export default layout