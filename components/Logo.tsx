import { siteConfig } from "@/data/site";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <span className="font-mono text-lg font-semibold leading-none text-lime">
        {siteConfig.logo}
      </span>
      <span className="text-sm font-semibold tracking-[0.08em] text-fg sm:text-base">
        2Brothers Services
      </span>
    </span>
  );
}
