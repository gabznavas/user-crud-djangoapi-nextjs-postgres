"use client"

import Header from "@/components/header";
import React from "react";
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  React.useEffect(() => {
    window.document.title = "Login"
  }, []);

  return (
    <div>
      <Header />
      {children}
    </div>
  )
}