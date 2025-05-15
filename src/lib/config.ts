export const config = {
  site: {
    title: "Jacknight&",
    name: "Jacknight's Personal Site",
    description: "Personal website and blog of Jacknight",
    keywords: ["web development", "programming", "typescript", "react", "nextjs"],
    url: "https://jacknight-and-friends.vercel.app/",
    baseUrl: "https://jacknight-and-friends.vercel.app/",
    image: "https://jacknight-and-friends.vercel.app/",
    favicon: {
      ico: "/favicon.ico",
      png: "/favicon.png",
      svg: "/favicon.svg",
      appleTouchIcon: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
  },
  author: {
    name: "Jacknight",
    email: "wang.jiankai@outlook.com",
    bio: "Machine Learning Engineer, Full Stack Developer",
  },
  social: {
    github: "https://github.com/Will-JacKnight",
    // twitter: "https://twitter.com/jacknight",
    linkedin: "https://www.linkedin.com/in/jiankai-wang/",
  },
  rss: {
    title: "Jacknight's Blog",
    description: "Articles on web development, technology, and more"
  },
  seo: {
    metadataBase: new URL("https://jacknight-and-friends.vercel.app/"),
    alternates: {
      canonical: './',
    },
    openGraph: {
      type: "website" as const,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image" as const,
      creator: "@jacknight",
    },
  },
}; 