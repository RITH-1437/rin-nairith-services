import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import { DocumentScripts, ThemeProvider } from "@/components/theme-provider";
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
    "2Brothers Services",
    "digital solutions Cambodia",
    "business website development",
    "custom web application development",
    "business management systems",
    "backend and API development",
    "AI application development",
    "cloud deployment",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  verification: {
    google: "1iTKwNVl9rQdavMT2BrVnM1tq3mf3-RB2G0A5yN48hE",
  },
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
        alt: `${siteConfig.name} — Digital Solutions for Modern Businesses`,
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
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: [
      { url: "/images/logo/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/images/logo/icon.png",
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
    var under = document.elementFromPoint(x, y);
    if (isInteractive(under)) {
      dot.classList.add('is-pointer');
      glow.classList.add('is-pointer');
    } else {
      dot.classList.remove('is-pointer');
      glow.classList.remove('is-pointer');
    }
  }

  function start() {
    init();
    document.addEventListener('mousemove', onMove, { passive: true });
  }

  if (window.matchMedia('(pointer: fine)').matches) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
      start();
    }
  }
})();
`;

const organizationId = `${siteConfig.url}/#organization`;
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": organizationId,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  logo: `${siteConfig.url}/images/people/favicon.png`,
  image: `${siteConfig.url}/opengraph-image`,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "en",
  publisher: { "@id": organizationId },
};

const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [organizationJsonLd, websiteJsonLd],
});

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
        <Script id="cursor-script" strategy="afterInteractive">
          {cursorScript}
        </Script>
      </head>
      <body className="font-sans">
        <DocumentScripts structuredData={structuredData} />
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
