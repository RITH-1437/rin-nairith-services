import { Check, ArrowUpRight } from "lucide-react";
import type { PricingPlan } from "@/data/pricing";

interface PricingCardProps {
  plan: PricingPlan;
}

export default function PricingCard({ plan }: PricingCardProps) {
  const featured = !!plan.featured;
  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-xl border p-7 transition-all duration-300 ${
        featured
          ? "border-lime/50 bg-gradient-to-b from-lime/10 to-panel shadow-[0_0_40px_rgba(183,255,60,0.15)] hover:shadow-[0_0_60px_rgba(183,255,60,0.22)]"
          : "border-line bg-panel hover:-translate-y-1 hover:border-lime/40"
      }`}
    >
      {featured ? (
        <span className="absolute right-0 top-0 rounded-bl-lg bg-lime px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-bg">
          Popular
        </span>
      ) : null}

      <h3 className="font-mono text-sm uppercase tracking-[0.15em] text-fgMuted">
        {plan.name}
      </h3>

      <p className="mt-4 text-4xl font-bold tracking-tight text-fg">
        <span className="mr-1.5 text-base font-normal text-fgMuted">From</span>
        {plan.price}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-fgMuted">
        {plan.description}
      </p>

      <div className="my-6 h-px w-full bg-line" />

      <ul className="flex-1 space-y-2.5">
        {plan.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-fg">
            <Check
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-lime"
            />
            {item}
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={`group mt-7 inline-flex w-full items-center justify-center gap-1.5 rounded-md px-5 py-3 text-sm font-medium transition-all duration-200 ${
          featured
            ? "bg-lime text-bg hover:bg-limeStrong hover:shadow-[0_0_24px_rgba(183,255,60,0.4)]"
            : "border border-lineStrong text-fg hover:border-lime hover:bg-lime/10"
        }`}
      >
        {plan.cta}
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>
    </div>
  );
}
