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
          description="Transparent starting prices for common project types. Every project is estimated after a quick discussion."
        />        <div className="grid gap-5 md:grid-cols-3">
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
