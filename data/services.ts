import {
  Layers,
  Server,
  Globe,
  LayoutDashboard,
  Cloud,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  slug: string;
  name: string;
  description: string;
  features: string[];
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    id: "web-applications",
    slug: "web-applications",
    name: "Web Application Development",
    description:
      "Build complete web applications with frontend, backend, database, authentication, and APIs.",
    features: ["Frontend + Backend", "Database", "Authentication & APIs"],
    icon: Layers,
  },
  {
    id: "backend-api",
    slug: "backend-api",
    name: "Backend & API Development",
    description:
      "Build RESTful APIs, backend systems, authentication, business logic, and integrations.",
    features: ["REST APIs", "Business logic", "Integrations"],
    icon: Server,
  },
  {
    id: "business-websites",
    slug: "business-websites",
    name: "Business Websites",
    description:
      "Professional websites for businesses, organizations, and personal brands.",
    features: ["Responsive", "SEO-ready", "Fast loading"],
    icon: Globe,
  },
  {
    id: "admin-systems",
    slug: "admin-systems",
    name: "Admin & Management Systems",
    description:
      "Custom dashboards for users, products, bookings, reports, and business operations.",
    features: ["Dashboards", "Reports", "User management"],
    icon: LayoutDashboard,
  },
  {
    id: "cloud-deployment",
    slug: "cloud-deployment",
    name: "Cloud Deployment",
    description:
      "Deploy applications to production using AWS, Docker, Nginx, Linux, and CI/CD.",
    features: ["AWS EC2", "Docker & Nginx", "CI/CD pipelines"],
    icon: Cloud,
  },
  {
    id: "software-maintenance",
    slug: "software-maintenance",
    name: "Software Maintenance",
    description:
      "Bug fixing, optimization, feature development, deployment, and technical improvements.",
    features: ["Bug fixes", "Optimization", "New features"],
    icon: Wrench,
  },
];
