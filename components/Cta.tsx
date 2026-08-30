"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import NetworkBackground from "./NetworkBackground";
import Reveal from "./Reveal";
import { socialLinks } from "@/data/social";

export default function Cta() {
  const telegram = socialLinks.find((s) => s.name === "telegram");
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0">
        <NetworkBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/70 to-bg" />
      </div>

      <Reveal className="container-page relative z-10 text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight text-fg sm:text-4xl">
          Have an Idea? Let's Build It.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-fgMuted">
          Tell me what you need and let's turn your idea into a working digital
          product.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a href="#contact" className="btn-primary px-7 py-3.5">
            Start a Project
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </a>
          <a
            href={telegram?.href ?? "#contact"}
            target={telegram?.href?.startsWith("http") ? "_blank" : undefined}
            rel={telegram?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
            className="btn-secondary px-7 py-3.5"
          >
            <MessageCircle aria-hidden="true" className="h-4 w-4" />
            Message Me
          </a>
        </div>
      </Reveal>
    </section>
  );
}
