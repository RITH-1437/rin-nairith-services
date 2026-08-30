import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-panel p-6 transition-all duration-300 hover:-translate-y-1 hover:border-lime/40 hover:shadow-[0_0_24px_rgba(183,255,60,0.08)]">
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-md border border-lime/30 bg-lime/10 text-lime transition-colors duration-300 group-hover:bg-lime/20">
        <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.6} />
      </div>
      <h3 className="text-lg font-semibold text-fg">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-fgMuted">
        {service.description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {service.features.map((feature) => (
          <li
            key={feature}
            className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-fgMuted"
          >
            {feature}
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className="mt-5 inline-flex items-center gap-1.5 text-sm text-lime"
        aria-label={`Request ${service.name.toLowerCase()}`}
      >
        Start with this
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>
    </div>
  );
}
