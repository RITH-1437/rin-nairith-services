import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "software development services",
    "software developer Cambodia",
    "software developer Phnom Penh",
    "web developer Cambodia",
    "backend developer Cambodia",
    "web application development",
    "backend & API development",
    "RIN Nairith",
    "RIN NAIRITH",
  ],
  authors: [{ name: siteConfig.developerName }],
  creator: siteConfig.developerName,
  publisher: siteConfig.name,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Software Development Services`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large" },
  },
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: "/images/me.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0c09" },
    { media: "(prefers-color-scheme: light)", color: "#f8f9f4" },
  ],
};

// Inline script sets the theme before first paint to avoid a flash.
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('rin-theme');
    var theme = stored === 'dark' || stored === 'light'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

// Cursor position CSS vars + pointer-on-hover — runs once, tiny footprint.
const cursorScript = `
(function () {
  var html = document.documentElement;
  var dot, glow;

  function init() {
    dot = document.createElement('div');
    glow = document.createElement('div');
    dot.className = 'cursor-dot';
    glow.className = 'cursor-glow';
    document.body.appendChild(dot);
    document.body.appendChild(glow);
  }

  function isInteractive(el) {
    return !!el && !!el.closest(
      'a, button, [role="button"], input, textarea, select, label, [data-cursor]'
    );
  }

  function onMove(e) {
    var x = e.clientX, y = e.clientY;
    html.style.setProperty('--mx', x + 'px');
    html.style.setProperty('--my', y + 'px');

    // Recompute interactivity from the element actually under the cursor.
    // Guards prevent flicker when children (or the cursor divs) shift under it.
    var under = document.elementFromPoint(x, y);
    var hit = isInteractive(under);
    if (hit) {
      dot.classList.add('is-pointer');
      glow.classList.add('is-pointer');
    } else {
      dot.classList.remove('is-pointer');
      glow.classList.remove('is-pointer');
    }
  }

  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('DOMContentLoaded', init);
    document.addEventListener('mousemove', onMove, { passive: true });
  }
})();
`;

// Structured data: Person + WebSite, built only from real project data.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "RIN NAIRITH",
  alternateName: "RIN Nairith",
  jobTitle: "Software Developer",
  url: siteConfig.portfolioUrl,
  image: `${siteConfig.url}/images/me.jpg`,
  sameAs: [
    siteConfig.social.github,
    siteConfig.social.linkedin,
    siteConfig.social.facebook,
    siteConfig.social.telegram,
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  alternateName: siteConfig.developerName,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "en",
  publisher: {
    "@type": "Person",
    name: "RIN NAIRITH",
    url: siteConfig.portfolioUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [personJsonLd, websiteJsonLd],
};

const structuredData = JSON.stringify(jsonLd);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: cursorScript }} />
        <meta
          name="google-site-verification"
          content="1iTKwNVl9rQdavMT2BrVnM1tq3mf3-RB2G0A5yN48hE"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      </head>
      <body className="font-sans">
        <ThemeProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <FloatingCta />
        </ThemeProvider>
      </body>
    </html>
  );
}
