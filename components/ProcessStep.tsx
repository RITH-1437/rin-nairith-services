interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  isLast?: boolean;
}

export default function ProcessStep({
  number,
  title,
  description,
  isLast = false,
}: ProcessStepProps) {
  return (
    <li className="relative flex gap-5">
      <div className="flex flex-col items-center">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-lime/40 bg-panel font-mono font-semibold text-lime">
          {number}
        </span>
        {!isLast ? (
          <span
            aria-hidden="true"
            className="mt-2 w-px flex-1 bg-gradient-to-b from-lime/40 to-lime/10"
          />
        ) : null}
      </div>
      <div className="pb-10">
        <h3 className="text-lg font-semibold text-fg">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-fgMuted">
          {description}
        </p>
      </div>
    </li>
  );
}
