import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Hidratation } from '@/components/Hidratation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      
      <body className={`${inter.className} antialiased flex min-h-screen flex-col p-6 bg-slate-200 `} >
      
        <Hidratation>

        <Navbar />
    
        {children}
        </Hidratation>
        </body>

    </html>
  )
}