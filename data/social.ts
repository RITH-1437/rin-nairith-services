import { Send, Facebook, Linkedin, Github, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { siteConfig } from "./site";

export interface SocialLink {
  name: string;
  label: string;
  href: string;
  /** Priority for display (telegram strongest) */
  priority: number;
  /** lucide icon */
  icon: LucideIcon;
}

export const socialLinks: SocialLink[] = [
  {
    name: "telegram",
    label: "Telegram",
    href: siteConfig.social.telegram,
    priority: 1,
    icon: Send,
  },
  {
    name: "facebook",
    label: "Facebook",
    href: siteConfig.social.facebook,
    priority: 2,
    icon: Facebook,
  },
  {
    name: "linkedin",
    label: "LinkedIn",
    href: siteConfig.social.linkedin,
    priority: 3,
    icon: Linkedin,
  },
  {
    name: "github",
    label: "GitHub",
    href: siteConfig.social.github,
    priority: 4,
    icon: Github,
  },
  {
    name: "email",
    label: "Email",
    href: `mailto:${siteConfig.social.email}`,
    priority: 5,
    icon: Mail,
  },
];
