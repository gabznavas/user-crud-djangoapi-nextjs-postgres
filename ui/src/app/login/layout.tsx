"use client"

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
      {children}
    </div>
  )
}