import { ArrowRight, Github, MapPin } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { siteConfig } from "@/data/site";

const focus = [
  "Websites and digital experiences",
  "Business management systems",
  "APIs, integrations, and data tools",
  "Cloud deployment and maintenance",
];

export default function About() {
  return (
    <section id="about" className="section bg-bgSoft">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading
            label="About"
            title="A two-person team for practical digital work"
          />
          <p className="-mt-6 text-base leading-relaxed text-fgMuted">
            2Brothers Services is a digital solutions company focused on clear,
            useful software. We work with founders, teams, and organizations
            that need a better website, a more organized operation, or a
            custom application to support their work.
          </p>
          <p className="mt-4 text-base leading-relaxed text-fgMuted">
            Our approach combines product thinking, hands-on development, and
            practical deployment experience. The goal is to make the next step
            clear and the final product dependable.
          </p>
          <p className="mt-6 flex items-center gap-2 text-sm text-fgMuted">
            <MapPin aria-hidden="true" className="h-4 w-4 text-lime" />
            {siteConfig.location}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary">
              Work with us
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/RITH-1437"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Github aria-hidden="true" className="h-4 w-4" />
              View GitHub
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-xl border border-line bg-panel p-7 sm:p-8">
            <p className="font-mono text-sm uppercase tracking-[0.18em] text-lime">
              Our focus
            </p>
            <h3 className="mt-4 text-xl font-semibold text-fg">
              Useful software, built with care.
            </h3>
            <ul className="mt-6 space-y-4">
              {focus.map((item) => (
                <li key={item} className="flex items-start gap-3 text-fg">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-line pt-5 font-mono text-xs uppercase tracking-[0.16em] text-fgFaint">
              {siteConfig.role}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
