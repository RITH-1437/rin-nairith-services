import SectionHeading from "./SectionHeading";
import ServiceCard from "./ServiceCard";
import Reveal from "./Reveal";
import { services } from "@/data/services";

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container-page">
        <SectionHeading
          label="Services"
          title="What I Can Build For You"
          description="From a landing page to a complete web application deployed to the cloud, I build reliable software tailored to your goals."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={(i % 3) * 0.08}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
