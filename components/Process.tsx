import SectionHeading from "./SectionHeading";
import ProcessStep from "./ProcessStep";
import Reveal from "./Reveal";

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "Understand your idea, audience, requirements, and goals.",
  },
  {
    number: "02",
    title: "Scope",
    description: "Define the features, technology, boundaries, and timeline.",
  },
  {
    number: "03",
    title: "Design",
    description: "Shape the structure, interface, and user experience.",
  },
  {
    number: "04",
    title: "Build",
    description: "Develop the frontend, backend, database, and integrations.",
  },
  {
    number: "05",
    title: "Launch",
    description: "Deploy the completed product and verify the essentials.",
  },
  {
    number: "06",
    title: "Support",
    description: "Help with fixes, improvements, and future changes.",
  },
];

export default function Process() {
  return (
    <section id="process" className="section bg-bgSoft">
      <div className="container-page">
        <SectionHeading
          label="Process"
          title="How We Work"
          description="A clear, structured path from your first conversation to a launched product and ongoing support."
        />
        <Reveal>
          <ol className="mx-auto max-w-2xl">
            {steps.map((step, i) => (
              <ProcessStep
                key={step.number}
                {...step}
                isLast={i === steps.length - 1}
              />
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
