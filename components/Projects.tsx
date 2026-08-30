"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import { projects, projectCategories } from "@/data/projects";

const filters = ["All", ...projectCategories] as const;

export default function Projects() {
  const [active, setActive] = useState<string>("All");

  const visible =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="section">
      <div className="container-page">
        <SectionHeading
          label="Portfolio"
          title="Selected Work"
          description="Real projects I've designed, built, and deployed — open-source tools, web applications, and cloud-deployed systems."
        />

        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="mb-8 flex flex-wrap gap-2"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={active === filter}
              onClick={() => setActive(filter)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                active === filter
                  ? "border-lime bg-lime/15 text-lime"
                  : "border-line text-fgMuted hover:border-lime/40 hover:text-fg"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <Reveal key={project.id} delay={(i % 3) * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="https://github.com/RITH-1437"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            View All on GitHub
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
