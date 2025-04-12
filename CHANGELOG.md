# Changelog

## [0.0.2] - 2025-04-12

### Logo Implementation Evaluation

#### Findings
- Compared two approaches for logo implementation:
  1. **Dynamic Loading** (`LogoIcon` component): Loads SVG from favicon.svg at runtime
  2. **Hardcoded SVG** (`Logo` component): Embeds the SVG directly in the component

#### Decision
- **Chose Hardcoded SVG Approach** for the following reasons:
  - Eliminates logo "blinking" on page refresh/initial load
  - Better performance (no additional HTTP request)
  - Simpler implementation with fewer moving parts
  - Critical UI element where visual stability is prioritized over DRY principles

#### Trade-offs
- **Advantage of Dynamic Approach**: Single source of truth for logo in favicon.svg
- **Advantage of Hardcoded Approach**: Immediate rendering without loading state

#### Maintenance Note
- When updating the logo design, remember to update in two places:
  1. `/public/favicon.svg` for the favicon
  2. `src/components/icons/Logo.tsx` for the in-app logo

## [0.0.1] - 2025-04-10

### Migration from Vite to Next.js

#### Added
- Next.js configuration (`next.config.js`)
  - Static export support for GitHub Pages
  - Image domain configuration
  - Base path and asset prefix for production
- TypeScript configuration (`tsconfig.json`)
  - Path aliases for better imports
  - Strict type checking
  - Next.js specific settings
- Tailwind CSS configuration (`tailwind.config.js`)
  - Dark mode support
  - Custom theme colors
  - Animation utilities
- PostCSS configuration (`postcss.config.js`)
  - Tailwind CSS processing
  - Autoprefixer support
- Next.js app structure
  - App Router setup
  - Root layout with theme support
  - Global CSS with Tailwind
- UI Components
  - Theme provider
  - Theme toggle
  - Button component
  - Utility functions

#### Changed
- Build system from Vite to Next.js
- Routing from `react-router-dom` to Next.js file-based routing
- Styling system to use Tailwind CSS with theme support
- Project structure to follow Next.js conventions
- Development scripts in `package.json`

#### Dependencies Added
- Core Dependencies:
  - `next`
  - `next-themes`
  - `@radix-ui/react-slot`
  - `class-variance-authority`
  - `clsx`
  - `tailwind-merge`
  - `lucide-react`
- Development Dependencies:
  - `tailwindcss-animate`
  - `@types/node`
  - `@types/react`
  - `@types/react-dom`
  - `eslint-config-next`

#### Key Differences
1. **Routing**: 
   - Old: Client-side routing with `react-router-dom`
   - New: File-based routing with Next.js App Router

2. **Build System**:
   - Old: Vite for development and production builds
   - New: Next.js with static export support for GitHub Pages

3. **Styling**:
   - Old: Custom CSS with CSS modules
   - New: Tailwind CSS with theme system and dark mode support

4. **Project Structure**:
   - Old: Custom directory structure
   - New: Next.js App Router structure with `src/app` and `src/components`

5. **TypeScript**:
   - Old: Basic TypeScript configuration
   - New: Strict TypeScript with Next.js specific settings

6. **Deployment**:
   - Old: Custom GitHub Pages configuration
   - New: Next.js static export with built-in GitHub Pages support

#### Next Steps
1. Migrate existing components to the new structure
2. Convert routes to Next.js pages
3. Update imports to use new path aliases
4. Test the application
5. Deploy to GitHub Pages 