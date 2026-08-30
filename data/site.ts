export const siteConfig = {
  name: "RIN NAIRITH",
  developerName: "RIN Nairith",
  logo: "</>",
  role: "Software Developer",
  location: "Phnom Penh, Cambodia",
  tagline: "Software Development • Web Applications • APIs • Cloud • Open Source",
  title: "RIN Nairith — Software Developer",
  description:
    "Software Developer building reliable web applications, RESTful APIs, developer tools, and cloud-deployed systems.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rin-nairith.vercel.app",
  cv: "https://rin-nairith.vercel.app/rin_nairith_cv.pdf",
  email: "nairithrin143@gmail.com",
  phone: "+855 96 62 73 314",
  stats: [
    { value: "15+", label: "Projects Shipped" },
    { value: "6+", label: "Months Experience" },
    { value: "5+", label: "Tech Stacks" },
  ],
  social: {
    telegram: "https://t.me/rith1506",
    facebook: "https://web.facebook.com/nairith.rin.2025/",
    linkedin: "https://www.linkedin.com/in/nairith-rin-4889933b3/",
    github: "https://github.com/RITH-1437",
    email: "nairithrin143@gmail.com",
  },
  experience: {
    current: {
      role: "Software Developer",
      company: "CTX-98 Co., Ltd",
      description:
        "Building and maintaining software solutions, developing web applications, and collaborating with cross-functional teams to deliver high-quality products in a production environment.",
    },
    history: [
      {
        role: "Software Developer",
        company: "CTX-98 Co., Ltd",
        period: "Present",
        description:
          "Building and maintaining software solutions, developing web applications, and collaborating with cross-functional teams to deliver high-quality products in a production environment.",
        tags: ["Software Development", "Web Applications", "System Design", "Team Collaboration"],
      },
      {
        role: "Full Stack Developer Intern",
        company: "KRU IT Solution",
        period: "Nov 2024 – Feb 2025",
        description:
          "Completed a 3-month internship as a Full Stack Developer, where I designed, developed, and maintained a Course Management System. Collaborated with the team to implement responsive UIs, RESTful APIs, database design, authentication, and core system features.",
        tags: ["Full Stack Development", "Course Management System", "REST API", "Database Design", "Team Collaboration"],
      },
      {
        role: "Computer Science Student",
        company: "Institute of Technology of Cambodia",
        period: "2023 – Present",
        description:
          "Studying computer science fundamentals, algorithms, operating systems, and software engineering. Building projects that apply theoretical knowledge to real-world problems.",
        tags: ["Algorithms", "OS Concepts", "Software Engineering"],
      },
    ],
  },
} as const;
