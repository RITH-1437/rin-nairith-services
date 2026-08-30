import SectionHeading from "./SectionHeading";
import ProcessStep from "./ProcessStep";
import Reveal from "./Reveal";

const steps = [
  {
    number: "01",
    title: "Discuss",
    description: "Understand your idea, requirements, and goals.",
  },
  {
    number: "02",
    title: "Plan",
    description: "Define features, technology, scope, and timeline.",
  },
  {
    number: "03",
    title: "Design",
    description: "Create the structure and user experience.",
  },
  {
    number: "04",
    title: "Build",
    description: "Develop the frontend, backend, database, and APIs.",
  },
  {
    number: "05",
    title: "Launch",
    description: "Deploy the completed project to production.",
  },
  {
    number: "06",
    title: "Support",
    description: "Fix issues and continue improving the application.",
  },
];

export default function Process() {
  return (
    <section id="process" className="section bg-bgSoft">
      <div className="container-page">
        <SectionHeading
          label="Process"
          title="How I Work"
          description="A clear, structured process from your first idea to a launched product and beyond."
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
