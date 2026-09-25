export type ProjectStatus = "Live" | "Open Source" | "Development" | "Unavailable";

export type ProjectCategory = "Full Stack" | "Frontend" | "Backend" | "Open Source";

export interface Project {
  id: string;
  name: string;
  description: string;
  problem?: string;
  features: string[];
  technologies: string[];
  category: ProjectCategory;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  status: ProjectStatus;
  role: string;
}

export const projectCategories: ProjectCategory[] = [
  "Full Stack",
  "Frontend",
  "Backend",
  "Open Source",
];

export const projects: Project[] = [
  {
    id: "gokh",
    name: "GoKH — Cambodia Trip Planner",
    description:
      "Cambodia-focused collaborative trip planning product with a modern UI/UX — plan destinations together, manage travelers and dates, and organize transport, accommodation, budget, and a day-by-day itinerary with live weather and directions, all shared via a single share link.",
    problem:
      "Planning a group trip in Cambodia meant juggling many apps and spreadsheets. GoKH centralizes destinations, travelers, dates, budget, and a day-by-day itinerary into one collaborative, shareable planning experience.",
    features: [
      "Collaborative trip planning",
      "Manage travelers & dates",
      "Transport, accommodation & budget",
      "Day-by-day itinerary",
      "Live weather & directions",
      "Share via a single link",
    ],
    technologies: ["Vue.js", "Laravel", "MySQL", "REST API", "UI/UX", "Share Links"],
    category: "Full Stack",
    image: "/images/gokh.png",
    liveUrl: "https://gokh.vercel.app/",
    status: "Live",
    role: "Software Developer",
  },
  {
    id: "gitradar",
    name: "GitRadar — AI GitHub Portfolio Analysis",
    description:
      "Full-stack platform that connects to your GitHub account, analyzes repositories and development activity, and turns raw GitHub stats into a scored portfolio with actionable insights. Built with user-specific OAuth and secure multi-user data isolation.",
    problem:
      "GitHub stats are hard to translate into a strong portfolio. GitRadar connects to your account via OAuth, analyzes repositories and activity, and produces a scored portfolio with actionable insights — with secure multi-user data isolation.",
    features: [
      "GitHub OAuth integration",
      "Repository & activity analysis",
      "Scored portfolio generation",
      "Actionable insights",
      "Secure multi-user data isolation",
      "AI-assisted analysis",
    ],
    technologies: [
      "Laravel 13",
      "PHP",
      "PostgreSQL",
      "GitHub OAuth",
      "Tailwind CSS",
      "Alpine.js",
      "Queue Jobs",
      "AI Analysis",
      "AWS EC2",
      "Nginx",
    ],
    category: "Full Stack",
    image: "/images/gitradar.png",
    githubUrl: "https://github.com/RITH-1437/devscore-ai",
    status: "Open Source",
    role: "Software Developer",
  },
  {
    id: "zeroping",
    name: "ZeroPing — PHP Framework",
    description:
      "Open-source PHP MVC framework with CLI tooling, ORM, service container, middleware, and queues.",
    problem:
      "Building PHP applications repeatedly meant re-writing the same foundation. ZeroPing packages the core pieces — routing, ORM, a service container, and a queue system — into a reusable, maintainable framework.",
    features: [
      "CLI scaffolding",
      "Custom ORM",
      "Service container",
      "Middleware pipeline",
      "Queue system",
      "CI/CD on Docker + AWS EC2",
    ],
    technologies: ["PHP", "MVC", "Docker", "Nginx", "AWS EC2", "GitHub Actions", "MySQL"],
    category: "Open Source",
    image: "/images/zeroping.png",
    githubUrl: "https://github.com/RITH-1437/ZeroPing",
    status: "Unavailable",
    role: "Founder / Maintainer",
  },
  {
    id: "prompthub",
    name: "PromptHub — AI Prompt Platform",
    description:
      "Full-stack AI prompt sharing platform with user auth, public profiles, analytics, and leaderboards.",
    problem:
      "Prompt creators lacked a central place to publish, share, and track their prompts. PromptHub gives users accounts, profiles, analytics, and leaderboards in one platform.",
    features: [
      "User authentication",
      "Public profiles",
      "Prompt analytics",
      "Leaderboards",
      "Avatar uploads",
    ],
    technologies: ["Laravel", "PHP", "MySQL", "AWS EC2", "Nginx", "SSL/HTTPS"],
    category: "Full Stack",
    image: "/images/prompthub.png",
    githubUrl: "https://github.com/RITH-1437/prompthub",
    status: "Unavailable",
    role: "Software Developer",
  },
  {
    id: "aws-todo-app",
    name: "AWS Todo App Deployment",
    description:
      "Full-stack todo management app deployed on AWS EC2 with Apache2, SSL, a custom domain, and a GitHub deployment workflow.",
    problem:
      "Managing tasks across a team needed a shared, always-on todo system. This app adds auth, comments, and profile management, deployed end-to-end on AWS.",
    features: [
      "User authentication",
      "Task management",
      "Comments",
      "Profile management",
      "Production deployment on AWS",
    ],
    technologies: ["PHP", "MySQL", "AWS EC2", "Apache2", "Tailwind CSS", "SSL/HTTPS"],
    category: "Full Stack",
    image: "/images/todo.png",
    githubUrl: "https://github.com/RITH-1437/todo_app",
    status: "Unavailable",
    role: "Software Developer",
  },
  {
    id: "coffee-aroma",
    name: "Coffee Aroma Full Stack App",
    description:
      "Full-stack coffee ordering system built with Spring Boot and MySQL, with Telegram bot notifications.",
    problem:
      "A café needed a digital ordering flow that kept staff and customers in sync. Coffee Aroma provides a product catalog, cart, and admin dashboard, with real-time Telegram order alerts.",
    features: [
      "Product catalog",
      "Cart & ordering",
      "Admin dashboard",
      "Telegram Bot API notifications",
    ],
    technologies: ["Java Spring Boot", "MySQL", "Telegram Bot API", "HTML/CSS/JS"],
    category: "Full Stack",
    image: "/images/coffee.jpg",
    githubUrl: "https://github.com/RITH-1437/coffee_aroma_spring.git",
    status: "Open Source",
    role: "Software Developer",
  },
  {
    id: "cpu-scheduling",
    name: "CPU Scheduling Visualizer",
    description:
      "Interactive CPU scheduling simulator implementing FCFS, SJF, Round Robin, and Priority algorithms with real-time visualization.",
    problem:
      "OS scheduling algorithms are hard to grasp from diagrams alone. This visualizer runs the algorithms live so students can see how each one behaves.",
    features: [
      "FCFS, SJF, Round Robin, Priority",
      "Real-time visualization",
      "Deployed on GitHub Pages",
    ],
    technologies: ["JavaScript", "HTML/CSS", "OS Algorithms", "GitHub Pages"],
    category: "Open Source",
    image: "/images/cpu.jpg",
    githubUrl: "https://github.com/RITH-1437/cpu-scheduling",
    status: "Open Source",
    role: "Developer",
  },
  {
    id: "file-extension-validator",
    name: "File Extension Validator",
    description:
      "Mini Java tool that validates file names and extensions using regular expressions, with a GUI for testing edge cases.",
    problem:
      "Detecting invalid file formats manually is error-prone. This small tool uses regex to validate file names and extensions with an interactive GUI for edge cases.",
    features: [
      "Regex-based validation",
      "GUI interaction",
      "Edge-case & invalid format detection",
    ],
    technologies: ["Java", "Regex", "GUI"],
    category: "Open Source",
    image: "/images/file-extension.jpg",
    githubUrl: "https://github.com/RITH-1437/File_Extension.git",
    status: "Open Source",
    role: "Developer",
  },
  {
    id: "image-caption-generator",
    name: "Image Caption Generator",
    description:
      "AI-powered image caption generator built with CNN + LSTM and DenseNet201 transfer learning — automatic caption generation with a Streamlit web app.",
    features: [
      "Automatic caption generation",
      "CNN + LSTM architecture",
      "DenseNet201 transfer learning",
      "Streamlit web app",
    ],
    technologies: ["Python", "TensorFlow", "Streamlit", "NLP"],
    category: "Open Source",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    githubUrl: "https://github.com/YongLyhor/Image-Caption-Generator",
    status: "Open Source",
    role: "YONG Lyhor · Data Scientist",
  },
  {
    id: "cambodia-job-dashboard",
    name: "Cambodia Job Market Dashboard",
    description:
      "Data analytics dashboard built with Power BI to analyze Cambodian job posts and visualize salary trends, in-demand skills, and top-paying industries.",
    features: [
      "Job market analysis",
      "Salary trend visualization",
      "In-demand skills insights",
      "Top-paying industries",
    ],
    technologies: ["Power BI", "Excel", "SQL", "Python"],
    category: "Backend",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    status: "Unavailable",
    role: "YONG Lyhor · Data Analyst",
  },
  {
    id: "sign-language-detection",
    name: "Real-Time Sign Language Detection",
    description:
      "Real-time sign language detection system built with YOLOv11, trained on a custom image dataset to recognize a set of gestures.",
    features: [
      "Real-time sign language detection",
      "YOLOv11 model",
      "Custom image dataset",
      "Gesture classification",
    ],
    technologies: ["Python", "YOLOv11", "Machine Learning", "Roboflow"],
    category: "Open Source",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0",
    githubUrl: "https://github.com/KheangDS/Sign-Language-Detection",
    status: "Open Source",
    role: "YONG Lyhor · Machine Learning",
  },
  {
    id: "ragkhmer-tutor-chatbot",
    name: "RagKhmer-Tutor Chatbot",
    description:
      "AI chatbot built with GPT-4o and RAG supporting Khmer and English question answering — multilingual retrieval with a Streamlit chat interface.",
    features: [
      "Khmer & English question answering",
      "RAG retrieval",
      "GPT-4o powered",
      "Streamlit chat interface",
    ],
    technologies: ["Streamlit", "Python", "RAG", "OpenAI API"],
    category: "Open Source",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44",
    githubUrl: "https://github.com/YongLyhor/RagKhmer-Tutor-Chatbot",
    status: "Open Source",
    role: "YONG Lyhor · Data Scientist",
  },
  {
    id: "ticket-management-system",
    name: "Ticket Management System",
    description:
      "Microservices-based ticket management system built with React.js and Spring Boot — ticket tracking, user management, real-time collaboration, and scalable backend services.",
    features: [
      "Ticket tracking",
      "User management",
      "Real-time collaboration",
      "Microservices architecture",
      "Scalable backend services",
    ],
    technologies: ["Java", "Spring", "React.js", "PostgreSQL", "AWS"],
    category: "Full Stack",
    image: "https://www.redvector.com/wp-content/uploads/2018/01/learning-management-system.png",
    githubUrl: "https://github.com/YongLyhor/Ticket-Management-System-TMS-",
    status: "Open Source",
    role: "YONG Lyhor · Full Stack Developer",
  },
];
