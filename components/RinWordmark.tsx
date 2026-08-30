import { siteConfig } from "@/data/site";

/**
 * "RIN NAIRITH" signature rendered as a clean, scalable SVG wordmark.
 * Terminal-inspired using only safe text + shapes (no exotic glyphs).
 * Colors are applied via CSS custom properties (rgb channel format), so the
 * mark is white in dark mode and dark in light mode, with lime accents.
 */
export default function RinWordmark({
  className = "h-9 w-auto sm:h-12",
}: {
  className?: string;
}) {
  const mono =
    "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

  return (
    <svg
      viewBox="0 0 720 180"
      role="img"
      aria-label={siteConfig.name}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Command prompt prefix (lime) */}
      <text
        x="16"
        y="46"
        fontFamily={mono}
        fontSize="22"
        letterSpacing="1"
        style={{ fill: "rgb(var(--accent))" }}
      >
        {">"} ~/rin-nairith
      </text>

      {/* The name — large, filled with lime accent */}
      <text
        x="16"
        y="122"
        fontFamily={mono}
        fontWeight="700"
        fontSize="56"
        letterSpacing="8"
        style={{ fill: "rgb(var(--accent))" }}
      >
        RIN NAIRITH
      </text>

      {/* Thin lime rule under the name */}
      <line
        x1="18"
        y1="144"
        x2="700"
        y2="144"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ stroke: "var(--line-strong)" }}
      />

      {/* Terminal cursor block (lime) */}
      <rect
        x="702"
        y="100"
        width="10"
        height="44"
        style={{ fill: "rgb(var(--accent))" }}
      />
    </svg>
  );
}
