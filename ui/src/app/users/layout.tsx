'use client'

import Header from "@/components/header"


export default function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}