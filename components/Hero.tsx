"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, FolderOpen } from "lucide-react";
import NetworkBackground from "./NetworkBackground";
import { siteConfig } from "@/data/site";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const buildAreas = [
  "Websites and digital experiences",
  "Business systems and dashboards",
  "APIs, integrations, and data tools",
  "Cloud deployment and maintenance",
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden py-24"
    >
      <div className="absolute inset-0">
        <NetworkBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg" />
      </div>

      <div className="container-page relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div className="max-w-3xl">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-4 py-1.5 font-mono text-xs font-medium tracking-wide text-lime"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-lime animate-slow-pulse"
              />
              Digital solutions for modern businesses
            </motion.p>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="text-4xl font-bold leading-[1.08] tracking-tight text-fg sm:text-5xl lg:text-6xl"
            >
              Digital Solutions Built for Modern{" "}
              <span className="text-lime">Businesses.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-fgMuted"
            >
              2Brothers Services builds tailored websites, business management
              systems, AI applications, and custom software solutions for
              modern businesses.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a href="#contact" className="btn-primary px-7 py-3.5">
                Start a Project
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
              <a href="#projects" className="btn-secondary px-7 py-3.5">
                <FolderOpen aria-hidden="true" className="h-4 w-4" />
                View Selected Work
              </a>
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="mt-12 font-mono text-xs uppercase tracking-[0.2em] text-fgFaint"
            >
              {siteConfig.tagline}
            </motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="rounded-2xl border border-lineStrong bg-panel/90 p-6 shadow-[0_0_50px_rgba(183,255,60,0.08)] backdrop-blur sm:p-8"
          >
            <div className="flex items-center gap-4 border-b border-line pb-6">
              <span className="flex h-12 w-24 shrink-0 items-center">
                <Image
                  src="/images/logo/logo-dark.png"
                  alt=""
                  width={640}
                  height={378}
                  className="h-full w-full object-contain [html[data-theme='light']_&]:hidden"
                  priority
                  sizes="96px"
                />
                <Image
                  src="/images/logo/logo-light.png"
                  alt=""
                  width={640}
                  height={435}
                  className="hidden h-full w-full object-contain [html[data-theme='light']_&]:block"
                  sizes="96px"
                />
              </span>
              <div>
                <p className="font-semibold text-fg">2Brothers Services</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-fgMuted">
                  From idea to launch
                </p>
              </div>
            </div>
            <p className="mt-6 text-lg font-medium leading-snug text-fg">
              One team for the digital layer your business depends on.
            </p>
            <ul className="mt-6 space-y-3">
              {buildAreas.map((area) => (
                <li key={area} className="flex items-start gap-3 text-sm text-fgMuted">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime"
                  />
                  {area}
                </li>
              ))}
            </ul>
            <div className="mt-7 border-t border-line pt-5 font-mono text-xs uppercase tracking-[0.16em] text-fgFaint">
              Web&nbsp;&nbsp;•&nbsp;&nbsp;Systems&nbsp;&nbsp;•&nbsp;&nbsp;Data&nbsp;&nbsp;•&nbsp;&nbsp;Cloud
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
