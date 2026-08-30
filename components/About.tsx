import { MapPin, Github, Download } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { siteConfig } from "@/data/site";

const focus = [
  "Software Development",
  "RESTful API Design",
  "Relational Database Design",
  "Cloud Infrastructure (AWS)",
  "CI/CD & GitHub Actions",
  "Framework Architecture",
];

export default function About() {
  return (
    <section id="about" className="section bg-bgSoft">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading
            label="About"
            title="A Developer Building Production Software"
          />
          <p className="-mt-6 text-base leading-relaxed text-fgMuted">
            I'm a Software Developer with a passion for clean architecture,
            developer tooling, and shipping production-ready software. I founded
            the{" "}
            <span className="font-semibold text-fg">ZeroPing PHP Framework</span>{" "}
            and have deployed multiple applications on AWS EC2 with Docker,
            Nginx, and CI/CD pipelines.
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm text-fgMuted">
            <MapPin aria-hidden="true" className="h-4 w-4 text-lime" />
            {siteConfig.location}
          </p>
          <p className="mt-6 text-sm leading-relaxed text-fgMuted">
            Based in Cambodia, I'm currently working at{" "}
            <span className="font-medium text-fg">
              {siteConfig.experience.current.company}
            </span>{" "}
            as a {siteConfig.experience.current.role} while continuing to expand
            my skills in cloud infrastructure, system design, and modern web
            development.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary">
              Let's Work Together
            </a>
            <a
              href={siteConfig.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Download aria-hidden="true" className="h-4 w-4" />
              Download CV
            </a>
            <a
              href="https://github.com/RITH-1437"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Github aria-hidden="true" className="h-4 w-4" />
              Open Source
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
            {siteConfig.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-lime sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-fgMuted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-xl border border-line bg-panel p-7">
            <h3 className="font-mono text-sm uppercase tracking-[0.18em] text-lime">
              Professional Focus
            </h3>
            <ul className="mt-5 space-y-3">
              {focus.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-fg"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-lime"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* Career timeline (real experience history) */}
      <div className="container-page mt-16">
        <Reveal>
          <h3 className="font-mono text-sm uppercase tracking-[0.18em] text-lime">
            Experience
          </h3>
          <div className="mt-6 space-y-6">
            {siteConfig.experience.history.map((job) => (
              <div
                key={`${job.company}-${job.role}`}
                className="relative border-l-2 border-line pl-6 sm:pl-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-lime"
                />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold text-fg">{job.role}</p>
                  <p className="font-mono text-xs text-fgMuted">{job.period}</p>
                </div>
                <p className="text-sm text-lime">{job.company}</p>
                <p className="mt-2 text-sm leading-relaxed text-fgMuted">
                  {job.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-fgMuted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
