export interface TechGroup {
  id: string;
  label: string;
  items: string[];
}

export const technologyGroups: TechGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "Vue.js", "Bootstrap", "Tailwind CSS"],
  },
  {
    id: "backend",
    label: "Backend",
    items: ["PHP", "Laravel", "ZeroPing", "Java Spring Boot", "C# .NET"],
  },
  {
    id: "database",
    label: "Database",
    items: ["MySQL", "PostgreSQL", "Database Design", "ORM"],
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    items: ["AWS EC2", "Docker", "Nginx", "Linux", "GitHub Actions", "SSL/HTTPS"],
  },
  {
    id: "tools",
    label: "Tools",
    items: ["Git", "GitHub", "Composer", "Vercel", "Postman"],
  },
];
