"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  ChevronRight,
  Info,
  CircleDot,
} from "lucide-react";
import type { Project } from "@/data/projects";
import { getProjectAvailability } from "@/data/projects";

const statusStyles: Record<Project["status"], string> = {
  Live: "border-lime/50 bg-lime/15 text-lime",
  "Open Source": "border-lineStrong bg-panelRaised text-fgMuted",
  Development: "border-lineStrong bg-panelRaised text-fgMuted",
  Unavailable: "border-line bg-panelRaised text-fgMuted",
};

const statusLabels: Record<Project["status"], string> = {
  Live: "Live",
  "Open Source": "Open Source",
  Development: "In development",
  Unavailable: "No public link",
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

// A compact, deterministic glyph derived from the project id.
function projectGlyph(id: string): string {
  return id
    .split(/[-_ ]/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase())
    .join("")
    .slice(0, 2);
}

function StatusBadge({ status }: { status: Project["status"] }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${statusStyles[status]}`}
    >
      {status === "Live" ? (
        <CircleDot aria-hidden="true" className="h-3 w-3" />
      ) : null}
      {statusLabels[status]}
    </span>
  );
}

const emptySubscribe = () => () => {};

/** Portals can only be created on the client, so wait until after hydration. */
function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const mounted = useHydrated();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const availability = getProjectAvailability(project);

  const primaryLink =
    availability.canViewLive && project.liveUrl
      ? { href: project.liveUrl, label: "Live demo" }
      : availability.canViewSource && project.githubUrl
        ? { href: project.githubUrl, label: "Source" }
        : null;

  const close = useCallback(() => setOpen(false), []);

  // Dialog behaviour: scroll lock, focus move/restore, Escape, focus trap.
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = triggerRef.current;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(focusableSelector)
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, close]);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-panel transition-all duration-300 hover:-translate-y-1 hover:border-lime/40 hover:shadow-[0_0_24px_rgba(183,255,60,0.08)] focus-within:border-lime/60">
      <div className="relative h-40 overflow-hidden border-b border-line">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} preview`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center bg-panelRaised">
            <span aria-hidden="true" className="font-mono text-4xl font-bold text-lime">
              {projectGlyph(project.id)}
            </span>
            <span className="absolute bottom-2 left-2 font-mono text-[11px] uppercase tracking-wider text-fgFaint">
              Project preview
            </span>
          </div>
        )}
        <span
          aria-hidden="true"
          className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded bg-black/60 font-mono text-xs font-bold text-lime backdrop-blur-sm"
        >
          {projectGlyph(project.id)}
        </span>
        <span className="absolute left-2 top-2">
          <StatusBadge status={project.status} />
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-base font-semibold leading-snug text-fg">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-label={`${project.name} — view project details`}
            className="text-left after:absolute after:inset-0 after:content-['']"
          >
            <span className="transition-colors group-hover:text-lime">{project.name}</span>
          </button>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-fgMuted">
          {project.description}
        </p>
        {availability.note ? (
          <p className="mt-2.5 flex items-start gap-1.5 text-xs leading-relaxed text-fgMuted">
            <Info aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {availability.note}
          </p>
        ) : null}
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

      <div className="mt-auto flex items-center justify-between px-5 pb-5">
        <span className="text-xs text-fgFaint">{project.role}</span>
        {primaryLink ? (
          <a
            href={primaryLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 -my-2 inline-flex items-center gap-1 py-2.5 text-sm font-medium text-lime hover:underline"
          >
            {primaryLink.label}
            <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
            <span className="sr-only"> for {project.name} (opens in a new tab)</span>
          </a>
        ) : (
          <span
            aria-hidden="true"
            className="pointer-events-none inline-flex items-center gap-1 font-medium text-lime"
          >
            Details
            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        )}
      </div>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-4"
                  onClick={close}
                >
                  <motion.div
                    ref={dialogRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={`project-title-${project.id}`}
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 24, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    onClick={(event) => event.stopPropagation()}
                    className="max-h-[92dvh] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-t-2xl border border-lineStrong bg-panel p-5 shadow-2xl sm:max-h-[90dvh] sm:rounded-xl sm:p-8"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <StatusBadge status={project.status} />
                        <h3
                          id={`project-title-${project.id}`}
                          className="mt-3 text-xl font-semibold leading-snug text-fg sm:text-2xl"
                        >
                          {project.name}
                        </h3>
                        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-fgFaint">
                          {project.role}
                        </p>
                      </div>
                      <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={close}
                        aria-label="Close project details"
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line text-fgMuted transition-colors hover:border-lime/50 hover:text-fg"
                      >
                        <X aria-hidden="true" className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="relative mt-5 aspect-[16/9] w-full overflow-hidden rounded-lg border border-line bg-panelRaised">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={`${project.name} preview`}
                          fill
                          sizes="(max-width: 768px) 100vw, 42rem"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span
                            aria-hidden="true"
                            className="font-mono text-5xl font-bold text-lime"
                          >
                            {projectGlyph(project.id)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 space-y-5 text-sm leading-relaxed text-fgMuted">
                      <div>
                        <h4 className="font-mono text-xs uppercase tracking-widest text-lime">
                          What it is
                        </h4>
                        <p className="mt-1">{project.description}</p>
                      </div>
                      {project.problem ? (
                        <div>
                          <h4 className="font-mono text-xs uppercase tracking-widest text-lime">
                            The problem it solves
                          </h4>
                          <p className="mt-1">{project.problem}</p>
                        </div>
                      ) : null}
                      <div>
                        <h4 className="font-mono text-xs uppercase tracking-widest text-lime">
                          What was built
                        </h4>
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
                        <h4 className="font-mono text-xs uppercase tracking-widest text-lime">
                          Technologies
                        </h4>
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
                          Category:{" "}
                          <span className="text-fgMuted">{project.category}</span>
                        </span>
                        <span>
                          Status:{" "}
                          <span className="text-fgMuted">{statusLabels[project.status]}</span>
                        </span>
                      </div>
                    </div>

                    <div className="mt-7 flex flex-col gap-3">
                      <div className="flex flex-wrap gap-3">
                        {availability.canViewLive && project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                          >
                            <ExternalLink aria-hidden="true" className="h-4 w-4" />
                            View Live Demo
                          </a>
                        ) : null}
                        {availability.canViewSource && project.githubUrl ? (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary"
                          >
                            <Github aria-hidden="true" className="h-4 w-4" />
                            View Source on GitHub
                          </a>
                        ) : null}
                      </div>
                      {availability.note ? (
                        <p className="flex items-start gap-2 rounded-md border border-line bg-panelRaised px-3.5 py-2.5 text-xs leading-relaxed text-fgMuted">
                          <Info aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                          {availability.note}
                        </p>
                      ) : null}
                    </div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </article>
  );
}
