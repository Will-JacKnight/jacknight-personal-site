"use client"

import { cn } from "@/lib/utils"

interface ColorInheritIconProps {
  className?: string
}

export default function ColorInheritIcon({ className }: ColorInheritIconProps) {
  return (
    <img
      src="/logo.svg"
      alt="Logo"
      width={32}
      height={32}
      className={cn("text-inherit", className)}
    />
  )
} 