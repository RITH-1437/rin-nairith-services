import { Compass, Layers, Users, Wrench } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const reasons = [
  {
    number: "01",
    title: "Clear scope",
    description:
      "We start with the outcome, audience, and required features so the plan stays understandable.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Practical technology",
    description:
      "We choose tools that fit the problem, from responsive interfaces to APIs, data layers, and deployment.",
    icon: Layers,
  },
  {
    number: "03",
    title: "Two perspectives",
    description:
      "Frontend, backend, data, and infrastructure are considered together from the beginning.",
    icon: Users,
  },
  {
    number: "04",
    title: "Support after launch",
    description:
      "Launch is a starting point. We can help with fixes, improvements, and new features.",
    icon: Wrench,
  },
];

export default function WhyUs() {
  return (
    <section id="why" className="section bg-bgSoft">
      <div className="container-page">
        <SectionHeading
          label="Why Us"
          title="A practical partner from idea to launch"
          description="2Brothers Services brings product thinking, technical execution, and a straightforward process into one collaboration."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <Reveal key={reason.number} delay={i * 0.06}>
                <article className="h-full rounded-xl border border-line bg-panel p-6 transition-colors hover:border-lime/40 sm:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs tracking-[0.2em] text-lime">
                      {reason.number}
                    </span>
                    <Icon aria-hidden="true" className="h-6 w-6 text-lime" strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-7 text-xl font-semibold text-fg">{reason.title}</h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-fgMuted">
                    {reason.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
