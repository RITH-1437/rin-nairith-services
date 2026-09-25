import SectionHeading from "./SectionHeading";
import PricingCard from "./PricingCard";
import Reveal from "./Reveal";
import { pricingPlans } from "@/data/pricing";

export default function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="container-page">
        <SectionHeading
          label="Pricing"
          title="Simple Starting Packages"
          description="A practical starting point for common project types. We refine the scope and estimate after a short conversation."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08}>
              <PricingCard plan={plan} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-sm text-fgFaint">
            Final pricing depends on project requirements, features, complexity, and timeline.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
