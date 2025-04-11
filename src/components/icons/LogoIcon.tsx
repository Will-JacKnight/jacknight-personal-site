"use client"

import { useEffect, useRef } from "react"

interface LogoIconProps {
  className?: string;
  src: string;
}

export function LogoIcon({ className, src }: LogoIconProps) {
  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadSvg = async () => {
      try {
        // Fetch the SVG file
        const response = await fetch(src);
        const svgText = await response.text();
        
        // Only proceed if our ref is still mounted
        if (svgRef.current) {
          // Set the SVG content
          svgRef.current.innerHTML = svgText;
          
          // Find all SVG elements and apply currentColor
          const svgElements = svgRef.current.querySelectorAll('svg');
          svgElements.forEach(svg => {
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
            svg.setAttribute('class', className || '');
            
            // Find all elements with a fill attribute and set them to currentColor
            const fillElements = svg.querySelectorAll('[fill]');
            fillElements.forEach(el => {
              if (el.getAttribute('fill') !== 'none') {
                el.setAttribute('fill', 'currentColor');
              }
            });
            
            // Do the same for stroke if needed
            const strokeElements = svg.querySelectorAll('[stroke]');
            strokeElements.forEach(el => {
              if (el.getAttribute('stroke') !== 'none') {
                el.setAttribute('stroke', 'currentColor');
              }
            });
          });
        }
      } catch (error) {
        console.error("Error loading SVG:", error);
      }
    };

    loadSvg();
  }, [src, className]);

  return (
    <div ref={svgRef} className={className} />
  )
} 