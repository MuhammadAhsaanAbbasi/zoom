import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "LOOM",
  description: "Video calling App",
  icons: {
    icon: "/icons/logo.svg",
  },
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      {children}
      </main>
  )
}

export default AuthLayout;