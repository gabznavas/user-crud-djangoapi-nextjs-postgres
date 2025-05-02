'use client'

import Header from "../components/header";

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}