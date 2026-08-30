import type { ComponentType } from "react";
import { socialLinks, type SocialLink } from "@/data/social";

interface SocialLinksProps {
  /** Telegram gets strong visual priority */
  variant?: "buttons" | "footer";
  className?: string;
}

function SocialButton({ link }: { link: SocialLink }) {
  const Icon = link.icon as ComponentType<{ className?: string }>;
  const isTelegram = link.name === "telegram";
  return (
    <a
      href={link.href}
      target={link.href.startsWith("http") ? "_blank" : undefined}
      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={link.label}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
        isTelegram
          ? "bg-lime text-bg hover:bg-limeStrong hover:shadow-[0_0_18px_rgba(183,255,60,0.35)]"
          : "border border-line bg-panel text-fgMuted hover:border-lime/50 hover:text-fg"
      }`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {link.label}
    </a>
  );
}

function FooterLink({ link }: { link: SocialLink }) {
  const Icon = link.icon as ComponentType<{ className?: string }>;
  return (
    <a
      href={link.href}
      target={link.href.startsWith("http") ? "_blank" : undefined}
      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={link.label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-fgMuted transition-colors hover:border-lime/50 hover:text-lime"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

export default function SocialLinks({ variant = "buttons", className }: SocialLinksProps) {
  if (variant === "footer") {
    return (
      <div className={`flex items-center gap-2 ${className ?? ""}`}>
        {socialLinks.map((link) => (
          <FooterLink key={link.name} link={link} />
        ))}
      </div>
    );
  }
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className ?? ""}`}>
      {socialLinks
        .slice()
        .sort((a, b) => a.priority - b.priority)
        .map((link) => (
          <SocialButton key={link.name} link={link} />
        ))}
    </div>
  );
}
