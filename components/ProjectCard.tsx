"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, Github, ChevronRight } from "lucide-react";
import type { Project } from "@/data/projects";

const statusStyles: Record<Project["status"], string> = {
  Live: "border-lime/40 bg-lime/15 text-lime",
  "Open Source": "border-lime/40 bg-lime/15 text-lime",
  Development: "border-lineStrong bg-panelRaised text-fgMuted",
  Unavailable: "border-line bg-panelRaised text-fgFaint",
};

// A compact, deterministic glyph derived from the project id.
function projectGlyph(id: string): string {
  return id
    .split(/[-_ ]/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase())
    .join("")
    .slice(0, 2);
}

export default function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-line bg-panel transition-all duration-300 hover:-translate-y-1 hover:border-lime/40 hover:shadow-[0_0_24px_rgba(183,255,60,0.08)]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className="block text-left"
        >
          <div className="relative h-40 overflow-hidden border-b border-line">
            <Image
              src={project.image}
              alt={`${project.name} screenshot`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
            />
            <span className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded bg-black/60 font-mono text-xs font-bold text-lime backdrop-blur-sm">
              {projectGlyph(project.id)}
            </span>
            <span
              className={`absolute left-2 top-2 rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${statusStyles[project.status]}`}
            >
              {project.status}
            </span>
          </div>
          <div className="p-5">
            <h3 className="text-base font-semibold leading-snug text-fg">
              {project.name}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-fgMuted">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-fgMuted"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 ? (
                <span className="px-1 font-mono text-[11px] text-fgFaint">
                  +{project.technologies.length - 3}
                </span>
              ) : null}
            </div>
          </div>
        </button>
        <div className="mt-auto flex items-center justify-between px-5 pb-5">
          <span className="text-xs text-fgFaint">{project.role}</span>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1 font-medium text-lime"
          >
            Details
            <ChevronRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </article>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={project.name}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-lineStrong bg-panel p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span
                    className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${statusStyles[project.status]}`}
                  >
                    {project.status}
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold text-fg">
                    {project.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close project details"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line text-fgMuted hover:text-fg"
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>

              <div className="relative mt-5 aspect-[16/9] w-full overflow-hidden rounded-lg border border-line">
                <Image
                  src={project.image}
                  alt={`${project.name} screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, 42rem"
                  className="object-cover"
                />
              </div>

              <div className="mt-5 space-y-5 text-sm leading-relaxed text-fgMuted">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-lime">Project</h4>
                  <p className="mt-1">{project.description}</p>
                </div>
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-lime">The Problem</h4>
                  <p className="mt-1">{project.problem}</p>
                </div>
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-lime">Main Features</h4>
                  <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-lime">Technology</h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-fgMuted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-fgFaint">
                  <span>
                    Category: <span className="text-fgMuted">{project.category}</span>
                  </span>
                  <span>
                    My role: <span className="text-fgMuted">{project.role}</span>
                  </span>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <ExternalLink aria-hidden="true" className="h-4 w-4" />
                    View Live
                  </a>
                ) : null}
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <Github aria-hidden="true" className="h-4 w-4" />
                    View GitHub
                  </a>
                ) : null}
                {!project.liveUrl && !project.githubUrl ? (
                  <p className="text-sm text-fgFaint">
                    This project is unavailable to view.
                  </p>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
