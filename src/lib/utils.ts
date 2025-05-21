import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { config } from "./config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Resolves an image URL using the base URL from config
 * If the URL already includes http/https, it's returned as is
 * Otherwise, it's combined with the imageBaseUrl from config
 */
export function getImageUrl(relativeUrl: string): string {
  if (!relativeUrl) return ''
  
  // If the URL already includes http/https, return it as is
  if (relativeUrl.startsWith('http://') || relativeUrl.startsWith('https://')) {
    return relativeUrl
  }
  
  // If it's a relative path starting with '/', remove the leading slash
  const cleanRelativeUrl = relativeUrl.startsWith('/') 
    ? relativeUrl.substring(1) 
    : relativeUrl
    
  // Combine with the base URL
  return `${config.site.imageBaseUrl}${cleanRelativeUrl}`
} 