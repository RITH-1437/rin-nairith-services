import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import { ThemeProvider } from "@/components/theme-provider";
import { THEME_STORAGE_KEY } from "@/lib/theme-storage";
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
      { url: "/images/logo/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/images/logo/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/images/logo/icon-192.png",
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

  // Touch and coarse pointers keep the native cursor entirely.
  if (!window.matchMedia('(pointer: fine)').matches) return;

  var dot, glow;

  function isInteractive(el) {
    return !!el && !!el.closest(
      'a, button, [role="button"], summary, select, label, [data-cursor]'
    );
  }

  function isTextEntry(el) {
    return !!el && !!el.closest('input:not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');
  }

  function onMove(e) {
    var target = e.target;
    html.style.setProperty('--mx', e.clientX + 'px');
    html.style.setProperty('--my', e.clientY + 'px');

    var pointer = isInteractive(target);
    dot.classList.toggle('is-pointer', pointer);
    glow.classList.toggle('is-pointer', pointer);
    html.classList.toggle('cursor-over-text', !pointer && isTextEntry(target));
  }

  function start() {
    dot = document.createElement('div');
    glow = document.createElement('div');
    dot.className = 'cursor-dot';
    glow.className = 'cursor-glow';
    document.body.appendChild(dot);
    document.body.appendChild(glow);

    // The native cursor is only hidden once the replacement exists, so a
    // script failure can never leave the visitor without a pointer.
    html.classList.add('has-custom-cursor');

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', function () {
      html.classList.add('cursor-away');
    });
    document.addEventListener('mouseenter', function () {
      html.classList.remove('cursor-away');
    });
    window.addEventListener('blur', function () {
      html.classList.add('cursor-away');
    });
    window.addEventListener('focus', function () {
      html.classList.remove('cursor-away');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
`;

const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var theme = stored === 'dark' || stored === 'light'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  } catch {
    return;
  }
})();
`;

const organizationId = `${siteConfig.url}/#organization`;
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": organizationId,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  logo: {
    "@type": "ImageObject",
    url: `${siteConfig.url}/images/logo/icon.png`,
    width: 512,
    height: 512,
  },
  image: `${siteConfig.url}/opengraph-image`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Phnom Penh",
    addressCountry: "KH",
  },
  sameAs: [
    siteConfig.social.telegram,
    siteConfig.social.facebook,
    siteConfig.social.linkedin,
    siteConfig.social.github,
  ],
  knowsAbout: [
    "Web development",
    "Business management systems",
    "Backend and API development",
    "AI applications",
    "Cloud deployment",
  ],
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
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      </head>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-lime focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-bg"
        >
          Skip to content
        </a>
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
