import Image from "next/image";
import { siteConfig } from "@/data/site";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <span className={`inline-flex items-center ${className ?? ""}`}>
      <span className="inline-flex h-9 items-center">
        <Image
          src="/images/logo/logo-dark.png"
          alt={siteConfig.name}
          width={640}
          height={378}
          priority
          sizes="64px"
          className="h-9 w-auto [html[data-theme='light']_&]:hidden"
        />
        <Image
          src="/images/logo/logo-light.png"
          alt=""
          width={640}
          height={435}
          sizes="64px"
          className="hidden h-9 w-auto [html[data-theme='light']_&]:block"
        />
      </span>
    </span>
  );
}
