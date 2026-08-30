"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, FolderOpen } from "lucide-react";
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

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden py-24"
    >
      <div className="absolute inset-0">
        <NetworkBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg" />
      </div>

      <div className="container-page relative z-10">
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
            Available for Freelance Projects
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-4xl font-bold leading-[1.08] tracking-tight text-fg sm:text-5xl lg:text-6xl"
          >
            I Build Software That{" "}
            <span className="text-lime">Solves Real Problems.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-fgMuted"
          >
            I'm {siteConfig.developerName}, a Software Developer building
            reliable web applications, APIs, developer tools, and
            cloud-deployed systems.
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
              View My Work
            </a>
            <a
              href={siteConfig.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-7 py-3.5"
            >
              Full Portfolio
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-12 font-mono text-xs uppercase tracking-[0.2em] text-fgFaint"
          >
            Software Development&ensp;•&ensp;Web Applications&ensp;•&ensp;APIs&ensp;•&ensp;Cloud&ensp;•&ensp;Open Source
          </motion.p>
        </div>
      </div>
    </section>
  );
}
