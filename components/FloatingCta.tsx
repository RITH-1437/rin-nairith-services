"use client";

import { ArrowUpRight } from "lucide-react";

export default function FloatingCta() {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", "#contact");
  };

  return (
    <a
      href="#contact"
      onClick={scrollToContact}
      className="fixed bottom-5 right-1/2 z-40 flex translate-x-1/2 items-center gap-1.5 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-bg shadow-lg shadow-black/40 transition-transform hover:scale-105 md:hidden"
      aria-label="Start a project with 2Brothers Services"
    >
      Let&apos;s Work Together
      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}
