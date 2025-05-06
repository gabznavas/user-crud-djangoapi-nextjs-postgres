'use client'

import Header from "@/components/header";
import React from "react";

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    window.document.title = "Registro"
  }, []);

  return (
    <div>
      <Header />
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}