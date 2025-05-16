"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { config } from '@/lib/config'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [copyStatus, setCopyStatus] = useState<string>('')
  
  const handleRSSClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    // Get the full URL to the RSS feed
    const rssUrl = `${window.location.origin}/rss.xml`
    
    // Copy to clipboard
    navigator.clipboard.writeText(rssUrl)
      .then(() => {
        setCopyStatus('Copied')
        
        // Clear the status message after 2 seconds
        setTimeout(() => {
          setCopyStatus('')
        }, 2000)
      })
      .catch(err => {
        console.error('Failed to copy: ', err)
        setCopyStatus('Failed to copy')
        
        // Clear the error message after 2 seconds
        setTimeout(() => {
          setCopyStatus('')
        }, 2000)
      })
  }
  
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
          <div className="relative">
            <a 
              href="/rss.xml"
              className="text-sm text-muted-foreground/80 transition-all duration-300 hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-current after:transition-all after:duration-300 after:w-0 hover:after:w-full"
              onClick={handleRSSClick}
              aria-label="Copy RSS Feed URL to clipboard"
              download
            >
              RSS
            </a>
            {copyStatus && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-background border border-border rounded-md text-xs whitespace-nowrap">
                {copyStatus}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
} 