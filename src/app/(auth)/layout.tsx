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
    <main className="flex w-full items-center justify-center my-10">
      {children}
    </main>
  )
}

export default AuthLayout;