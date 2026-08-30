export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  includes: string[];
  cta: string;
  featured?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "landing-page",
    name: "Landing Page",
    price: "$100",
    description: "A focused, high-converting single page for your product or campaign.",
    includes: ["Single-page design", "Responsive layout", "Contact section", "Social links", "Basic SEO"],
    cta: "Get Started",
  },
  {
    id: "business-website",
    name: "Business Website",
    price: "$250",
    description: "A complete multi-page site for your business or brand.",
    includes: ["Multiple pages", "Responsive design", "Contact form", "Basic SEO", "Deployment"],
    cta: "Get Started",
    featured: true,
  },
  {
    id: "custom-webapp",
    name: "Custom Web Application",
    price: "$500",
    description: "A full-stack application built around your exact requirements.",
    includes: ["Frontend", "Backend & API", "Database", "Authentication", "Dashboard", "Deployment"],
    cta: "Discuss Your Project",
  },
];
