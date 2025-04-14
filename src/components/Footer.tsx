"use client"

import React from 'react'
import Link from 'next/link'
import { config } from '@/lib/config'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="w-full border-t border-border/10 py-8 mt-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm text-muted-foreground/80 transition-colors hover:text-foreground/90">
          © {currentYear} Jacknight. All rights reserved.
        </div>
        <div className="flex items-center space-x-6">
          <Link 
            href={config.social.github}
            className="text-sm text-muted-foreground/80 transition-all duration-300 hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-current after:transition-all after:duration-300 after:w-0 hover:after:w-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          <Link 
            href={config.social.linkedin}
            className="text-sm text-muted-foreground/80 transition-all duration-300 hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-current after:transition-all after:duration-300 after:w-0 hover:after:w-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  )
} 