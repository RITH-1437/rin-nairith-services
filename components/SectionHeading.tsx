import Reveal from "./Reveal";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="section-label">
        <span aria-hidden="true" className="h-px w-6 bg-lime/60" />
        {label}
      </p>
      <h2 className="section-title">{title}</h2>
      {description ? <p className="section-desc">{description}</p> : null}
    </Reveal>
  );
}
