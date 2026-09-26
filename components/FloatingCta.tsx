"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function FloatingCta() {
  const [visible, setVisible] = useState(true);

  // The bar is fixed to the bottom of the viewport, so it would otherwise sit
  // on top of the contact form and the footer. Hide it while the contact
  // section itself is in view — the same action is already available there.
  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "-64px 0px -96px 0px" }
    );

    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href="#contact"
      onClick={(event) => {
        event.preventDefault();
        const el = document.getElementById("contact");
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", "#contact");
      }}
      aria-label="Start a project with 2Brothers Services"
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      className={`fixed bottom-5 right-1/2 z-40 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-bg shadow-lg shadow-black/40 transition-all duration-200 hover:scale-105 md:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-24 opacity-0"
      }`}
    >
      Let&apos;s Work Together
      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}
