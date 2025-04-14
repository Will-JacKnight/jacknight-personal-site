"use client"

import React from 'react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

interface PageLayoutProps {
  children: React.ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      <main className="container mx-auto px-4 pt-24 pb-8 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
} 