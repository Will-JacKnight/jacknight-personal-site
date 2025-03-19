import { useState, useEffect } from 'react';

function ColorInheritIcon({ src, className, width, height, ...props }) {
  const [svgContent, setSvgContent] = useState(null);

  useEffect(() => {
    fetch(src)
      .then(response => response.text())
      .then(text => {
        // Parse the SVG content
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'image/svg+xml');
        const svg = doc.querySelector('svg');
        
        // Apply currentColor to all fill and stroke attributes
        svg.querySelectorAll('*').forEach(el => {
          if (el.hasAttribute('fill') && el.getAttribute('fill') !== 'none') {
            el.setAttribute('fill', 'currentColor');
          }
          if (el.hasAttribute('stroke') && el.getAttribute('stroke') !== 'none') {
            el.setAttribute('stroke', 'currentColor');
          }
        });

        // Set dimensions if provided
        if (width) svg.setAttribute('width', width);
        if (height) svg.setAttribute('height', height);
        
        // Preserve viewBox if it exists
        const viewBox = svg.getAttribute('viewBox');
        if (!viewBox && width && height) {
          svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        }

        // Get the modified SVG content
        setSvgContent(svg.outerHTML);
      })
      .catch(error => {
        console.error('Error loading SVG:', error);
      });
  }, [src, width, height]);

  if (!svgContent) return null;

  return (
    <span 
      className={className}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      {...props}
    />
  );
}

export default ColorInheritIcon; 