import { siteConfig } from "@/data/site";

export default function RinWordmark({
  className = "h-9 w-auto sm:h-12",
}: {
  className?: string;
}) {
  const mono =
    "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

  return (
    <svg
      viewBox="0 0 900 180"
      role="img"
      aria-label={siteConfig.name}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <text
        x="16"
        y="46"
        fontFamily={mono}
        fontSize="22"
        letterSpacing="1"
        style={{ fill: "rgb(var(--accent))" }}
      >
        {">"} ~/2brothers-services
      </text>
      <text
        x="16"
        y="126"
        fontFamily={mono}
        fontWeight="700"
        fontSize="52"
        letterSpacing="5"
        style={{ fill: "rgb(var(--accent))" }}
      >
        2BROTHERS
      </text>
      <text
        x="520"
        y="126"
        fontFamily={mono}
        fontWeight="500"
        fontSize="52"
        letterSpacing="5"
        style={{ fill: "rgb(var(--fg))" }}
      >
        SERVICES
      </text>
      <line
        x1="18"
        y1="148"
        x2="880"
        y2="148"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ stroke: "var(--line-strong)" }}
      />
      <rect
        x="882"
        y="100"
        width="10"
        height="48"
        style={{ fill: "rgb(var(--accent))" }}
      />
    </svg>
  );
}
