'use client'

import Header from "@/components/header"
import ProtectedRoute from "@/components/protected-route"


export default function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div>
        <Header />
        <div className="p-4">
          {children}
        </div>
      </div>
    </ProtectedRoute>
  )
}