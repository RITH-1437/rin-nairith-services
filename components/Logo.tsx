import { siteConfig } from "@/data/site";

interface LogoProps {
  className?: string;
}

/**
 * Code-inspired logo mark: </> in monospace lime, followed by the wordmark.
 */
export default function Logo({ className }: LogoProps) {
  return (
    <span className={`inline-flex items-baseline gap-1.5 ${className ?? ""}`}>
      <span className="font-mono text-lg font-semibold leading-none text-lime">
        {siteConfig.logo}
      </span>
      <span className="font-semibold tracking-[0.12em] text-fg">
        {siteConfig.name}
      </span>
    </span>
  );
}
