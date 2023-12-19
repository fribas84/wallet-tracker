"use client";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Hidratation } from '@/components/Hidratation'
import Navbar from '@/components/Navbar'
import { AuthProvider } from '../../context/authContext'
import { useAuth } from "@/context/authContext";
import { Providers } from './providers'
const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Wallet Tracker',
//   description: 'a simple ethereum wallet tracker',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased flex min-h-screen flex-col p-6 bg-slate-200 `} >
        <Hidratation>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </Hidratation>
      </body>

    </html>
  )
}
