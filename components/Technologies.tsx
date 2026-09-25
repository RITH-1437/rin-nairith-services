import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { marqueeTech, technologyGroups } from "@/data/technologies";
import type { TechIcon } from "@/data/technologies";

function TechChip({ label, icon: Icon }: { label: string; icon: TechIcon }) {
  return (
    <li className="flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-panel px-4 py-2.5">
      <Icon aria-hidden="true" className="h-5 w-5 text-lime" />
      <span className="whitespace-nowrap text-sm text-fgMuted">{label}</span>
    </li>
  );
}

export default function Technologies() {
  return (
    <section id="technologies" className="section bg-bgSoft">
      <div className="container-page">
        <SectionHeading
          label="Technology"
          title="Tools for the work"
          description="We work across the layers that make a digital product useful: interfaces, applications, data, infrastructure, and delivery."
        />

        <Reveal className="relative mt-10">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bgSoft to-transparent sm:w-28"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bgSoft to-transparent sm:w-28"
            aria-hidden="true"
          />

          <div className="overflow-hidden motion-reduce:overflow-x-auto">
            {/* Track holds two identical copies and slides exactly one copy width (-50%). */}
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:animate-none">
              <ul className="flex shrink-0 items-center gap-3 pr-3">
                {marqueeTech.map((tech) => (
                  <TechChip key={tech.label} {...tech} />
                ))}
              </ul>
              <ul
                aria-hidden="true"
                className="flex shrink-0 items-center gap-3 pr-3 motion-reduce:hidden"
              >
                {marqueeTech.map((tech) => (
                  <TechChip key={tech.label} {...tech} />
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technologyGroups.map((group, g) => (
            <Reveal key={group.id} delay={g * 0.06}>
              <div className="h-full rounded-lg border border-line bg-panel p-5">
                <h3 className="mb-4 font-mono text-sm uppercase tracking-[0.18em] text-lime">
                  {group.label}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-line bg-panelRaised px-3 py-1.5 font-mono text-xs text-fgMuted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
