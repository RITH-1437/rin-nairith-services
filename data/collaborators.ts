import { Github, Linkedin, Mail, Facebook } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { siteConfig } from "./site";

export interface CollaboratorLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface Collaborator {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  links: CollaboratorLink[];
}

export const collaborators: Collaborator[] = [
  {
    id: "nairith",
    name: "RIN Nairith",
    role: "Frontend Developer & DevOps",
    description:
      "Focuses on frontend systems, APIs, and the infrastructure that helps keep digital products running in production.",
    image: "/images/people/nairith.webp",
    links: [
      { label: "GitHub", href: siteConfig.social.github, icon: Github },
      { label: "LinkedIn", href: siteConfig.social.linkedin, icon: Linkedin },
      { label: "Facebook", href: siteConfig.social.facebook, icon: Facebook },
      { label: "Email", href: `mailto:${siteConfig.social.email}`, icon: Mail },
    ],
  },
  {
    id: "lyhor",
    name: "YONG Lyhor",
    role: "Backend Developer",
    description:
      "Focuses on backend systems, databases, data applications, and the technical foundations behind useful products.",
    image: "/images/people/lyhor.webp",
    links: [
      { label: "GitHub", href: "https://github.com/yonglyhor", icon: Github },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/yong-lyhor-449b073b2/",
        icon: Linkedin,
      },
      { label: "Email", href: "mailto:yonglyhor1004@gmail.com", icon: Mail },
    ],
  },
];
