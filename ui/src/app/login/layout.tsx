"use client"

import React from "react";
import Header from "../components/header";
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