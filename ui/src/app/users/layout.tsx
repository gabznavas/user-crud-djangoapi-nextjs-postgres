'use client'

import Header from "@/components/header"
import ProtectedRoute from "@/components/protected-route"
import { useEffect } from "react"


export default function UsersLayout({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    document.title = 'Lista de Usuários'
  }, [])

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