import type { ComponentType, SVGProps } from "react";
import { Cloud } from "lucide-react";
import {
  SiBootstrap,
  SiComposer,
  SiCss,
  SiDocker,
  SiDotnet,
  SiGithub,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiLinux,
  SiMysql,
  SiNginx,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiSpring,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
} from "react-icons/si";

/** Accepts both react-icons (Simple Icons) and lucide components. */
export type TechIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface TechGroup {
  id: string;
  label: string;
  items: string[];
}

export const technologyGroups: TechGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Vue.js",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: ["PHP", "Laravel", "ZeroPing", "Java Spring Boot", "C# .NET", "REST APIs"],
  },
  {
    id: "database",
    label: "Database",
    items: ["MySQL", "PostgreSQL", "Database Design", "ORM"],
  },
  {
    id: "data-ai",
    label: "Data & AI",
    items: [
      "Python",
      "TensorFlow",
      "Machine Learning",
      "Computer Vision",
      "RAG",
      "LLM Applications",
      "Power BI",
      "SQL",
    ],
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    items: ["AWS EC2", "Docker", "Nginx", "Linux", "GitHub Actions", "SSL/HTTPS"],
  },
  {
    id: "tools",
    label: "Tools",
    items: ["Git", "GitHub", "Composer", "Vercel", "Postman", "Streamlit"],
  },
];

export interface MarqueeTech {
  label: string;
  icon: TechIcon;
}

/** Single-line scrolling strip of brand logos shown under the technology heading. */
export const marqueeTech: MarqueeTech[] = [
  { label: "HTML5", icon: SiHtml5 },
  { label: "CSS3", icon: SiCss },
  { label: "JavaScript", icon: SiJavascript },
  { label: "TypeScript", icon: SiTypescript },
  { label: "Vue.js", icon: SiVuedotjs },
  { label: "Tailwind CSS", icon: SiTailwindcss },
  { label: "Bootstrap", icon: SiBootstrap },
  { label: "PHP", icon: SiPhp },
  { label: "Laravel", icon: SiLaravel },
  { label: "Spring Boot", icon: SiSpring },
  { label: "C# / .NET", icon: SiDotnet },
  { label: "MySQL", icon: SiMysql },
  { label: "PostgreSQL", icon: SiPostgresql },
  { label: "AWS", icon: Cloud },
  { label: "Docker", icon: SiDocker },
  { label: "Nginx", icon: SiNginx },
  { label: "Linux", icon: SiLinux },
  { label: "GitHub", icon: SiGithub },
  { label: "GitHub Actions", icon: SiGithubactions },
  { label: "Composer", icon: SiComposer },
  { label: "Vercel", icon: SiVercel },
  { label: "Postman", icon: SiPostman },
];
