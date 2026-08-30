import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { technologyGroups } from "@/data/technologies";

export default function Technologies() {
  return (
    <section id="technologies" className="section bg-bgSoft">
      <div className="container-page">
        <SectionHeading
          label="Technologies"
          title="Technologies I Work With"
          description="A stack built on widely adopted, maintainable tools — from frontend to backend, databases, and cloud infrastructure."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
