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
    "software developer",
    "RIN Nairith",
    "web developer",
    "freelance developer",
    "web applications",
    "REST API",
    "cloud deployment",
    "AWS",
    "Laravel",
    "Spring Boot",
  ],
  authors: [{ name: siteConfig.developerName }],
  creator: siteConfig.developerName,
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
        alt: `${siteConfig.name} — Software Developer`,
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
