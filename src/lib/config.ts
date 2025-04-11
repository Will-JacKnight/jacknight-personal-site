import { URL } from "url";

export const config = {
  site: {
    title: "Jack Night",
    name: "Jack Night's Personal Site",
    description: "Personal website and blog of Jack Night",
    keywords: ["web development", "programming", "typescript", "react", "nextjs"],
    url: "https://jacknight.com",
    baseUrl: "https://jacknight.com",
    image: "https://jacknight.com/og-image.png",
    favicon: {
      ico: "/favicon.ico",
      png: "/favicon.png",
      svg: "/favicon.svg",
      appleTouchIcon: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
  },
  author: {
    name: "Jack Night",
    email: "info@jacknight.com",
    bio: "Developer and designer focused on creating elegant, functional digital experiences.",
  },
  social: {
    github: "https://github.com/jackknight",
    twitter: "https://twitter.com/jackknight",
    linkedin: "https://linkedin.com/in/jackknight",
  },
  seo: {
    metadataBase: new URL("https://jacknight.com"),
    alternates: {
      canonical: './',
    },
    openGraph: {
      type: "website" as const,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image" as const,
      creator: "@jackknight",
    },
  },
}; 