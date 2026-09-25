"use client";

import { ArrowUp } from "lucide-react";
import Reveal from "./Reveal";
import { siteConfig } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bgSoft">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(var(--fg) / 0.045) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--fg) / 0.045) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, black, transparent 75%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 75%)",
        }}
      />

      <div className="container-page relative z-10 pt-16 sm:pt-20">
        <Reveal className="border-b border-line pb-12">
          <div className="max-w-xl">
            <p className="section-label">
              <span aria-hidden="true" className="h-px w-6 bg-lime/60" />
              Get in touch
            </p>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-fg sm:text-4xl">
              Let&apos;s build something that
              <span className="text-lime"> actually ships.</span>
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-fgMuted">
              Tell us about the project, the timeline, and the outcome you need.
              We reply within one business day.
            </p>
          </div>
        </Reveal>

        <div aria-hidden="true" className="select-none overflow-hidden">
          <p className="translate-y-[0.16em] whitespace-nowrap bg-gradient-to-b from-lime/80 via-lime/35 to-lime/5 bg-clip-text text-center font-mono text-[15vw] font-bold leading-[0.85] tracking-tighter text-transparent [-webkit-text-stroke:1px_rgb(var(--accent)/0.35)] [paint-order:stroke_fill]">
            2Brothers Services
          </p>
        </div>
      </div>

      <div className="container-page relative z-10">
        <div className="flex flex-col gap-4 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-fgFaint">
            {siteConfig.tagline}
          </p>
          <a
            href="#home"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-line px-4 py-2 text-xs text-fgMuted transition-colors hover:border-lime/50 hover:text-fg"
          >
            Back to top
            <ArrowUp
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
