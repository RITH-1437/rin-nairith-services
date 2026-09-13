import { Github, Linkedin, Twitter, Mail, Facebook } from "lucide-react";
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
  study: string;
  description: string;
  image: string;
  links: CollaboratorLink[];
  profile?: CollaboratorProfile;
}

export interface TeamPhoto {
  src: string;
  alt: string;
}

export interface SkillGroup {
  id: string;
  label: string;
  items: string[];
}

export interface CollaboratorStat {
  value: string;
  label: string;
}

export interface ProjectLink {
  name: string;
  url?: string;
}

export interface CollaboratorProfile {
  bio: string;
  stats: CollaboratorStat[];
  skillGroups: SkillGroup[];
  projectLinks: ProjectLink[];
  portfolioUrl: string;
}

export const collaborators: Collaborator[] = [
  {
    id: "nairith",
    name: "RIN Nairith",
    role: "Frontend Developer & DevOps",
    study: "Computer Science — Institute of Technology of Cambodia (Final Year)",
    description:
      "Builds the user-facing layer and the infrastructure behind it — web applications, APIs, and production deployment with Docker, Nginx, and CI/CD on AWS.",
    image: "/images/people/nairith.png",
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
    study: "Data Science — Institute of Technology of Cambodia (Final Year)",
    description:
      "Backend developer focused on APIs, databases, and server-side systems — building the data layer that powers the projects we ship together.",
    image: "/images/people/lyhor.png",
    links: [
      { label: "GitHub", href: "https://github.com/yonglyhor", icon: Github },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/yong-lyhor-449b073b2/",
        icon: Linkedin,
      },
      { label: "Twitter", href: "https://twitter.com/yonglyhor", icon: Twitter },
      { label: "Email", href: "mailto:yonglyhor1004@gmail.com", icon: Mail },
    ],
    profile: {
      bio: "Passionate junior data scientist and full-stack developer specializing in modern web technologies and AI solutions. Based in Phnom Penh, Cambodia, he creates innovative digital experiences and intelligent, data-driven applications — from RESTful backends and databases to machine learning and data visualization.",
      stats: [
        { value: "3+", label: "Months Experience" },
        { value: "15+", label: "Successful Projects" },
        { value: "3+", label: "Happy Clients" },
      ],
      skillGroups: [
        {
          id: "frontend",
          label: "Frontend Development",
          items: ["HTML5", "CSS3", "JavaScript", "React.js"],
        },
        {
          id: "backend",
          label: "Backend Development",
          items: ["Java", "Spring Boot", "MySQL", "PostgreSQL"],
        },
        {
          id: "data-science",
          label: "Data Science & AI",
          items: ["Python", "Machine Learning", "Deep Learning", "Data Analysis"],
        },
        {
          id: "data-viz",
          label: "Data Visualization",
          items: ["Power BI", "Matplotlib", "Seaborn", "Plotly", "Excel"],
        },
        {
          id: "collaboration",
          label: "Collaboration",
          items: ["Git & GitHub", "Team Communication", "Code Review", "Cross-team Collaboration"],
        },
        {
          id: "tools",
          label: "Tools & Deployment",
          items: ["Git", "GitHub", "Vercel", "Docker"],
        },
      ],
      projectLinks: [
        {
          name: "Coffee Aroma Platform",
          url: "https://github.com/YongLyhor/Coffee_Aroma_Spring_Boot",
        },
        {
          name: "Image Caption Generator",
          url: "https://github.com/YongLyhor/Image-Caption-Generator",
        },
        { name: "Cambodia Job Market Dashboard" },
        {
          name: "Sign Language Detection",
          url: "https://github.com/KheangDS/Sign-Language-Detection",
        },
        {
          name: "RagKhmer-Tutor Chatbot",
          url: "https://github.com/YongLyhor/RagKhmer-Tutor-Chatbot",
        },
        {
          name: "Ticket Management System",
          url: "https://github.com/YongLyhor/Ticket-Management-System-TMS-",
        },
      ],
      portfolioUrl: "https://yonglyhor-portfolio-ams.vercel.app",
    },
  },
];

export const teamPhotos: TeamPhoto[] = [
  {
    src: "/images/people/together1.png",
    alt: "RIN Nairith and YONG Lyhor working together on a project",
  },
  {
    src: "/images/people/together2.png",
    alt: "RIN Nairith and YONG Lyhor collaborating on a build",
  },
];
