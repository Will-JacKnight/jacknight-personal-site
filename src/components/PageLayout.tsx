"use client"

import React from 'react'
import NavBar from '@/components/NavBar'

interface PageLayoutProps {
  children: React.ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container mx-auto px-4 pt-24 pb-8">
        {children}
      </main>
    </div>
  )
} 