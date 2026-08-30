export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    id: "cost",
    question: "How much does a website cost?",
    answer:
      "It depends on the type and complexity of the project. Landing pages start from around $100, business websites from $250, and custom web applications from $500. I'll give you a clear estimate after discussing your requirements.",
  },
  {
    id: "time",
    question: "How long does development take?",
    answer:
      "A landing page typically takes a few days, a business website one to two weeks, and a custom web application two to six weeks depending on scope. I'll agree on a realistic timeline before we start.",
  },
  {
    id: "redesign",
    question: "Can you redesign an existing website?",
    answer:
      "Yes. I can rebuild or redesign your existing website with a modern layout, better performance, and a cleaner user experience while keeping what works.",
  },
  {
    id: "backend-cloud",
    question: "Do you handle backend, APIs, and cloud deployment?",
    answer:
      "Yes. I build RESTful APIs, backend systems, and databases, and I deploy applications to production using AWS EC2, Docker, Nginx, Linux, and CI/CD pipelines.",
  },
  {
    id: "maintenance",
    question: "Can you maintain my software after launch?",
    answer:
      "Absolutely. I offer ongoing maintenance covering bug fixes, performance improvements, deployment, and new features after launch.",
  },
  {
    id: "custom-webapps",
    question: "Can you build custom web applications?",
    answer:
      "Yes. I build complete applications with a frontend, backend, database, authentication, and APIs — from business tools to admin and management systems.",
  },
  {
    id: "technologies",
    question: "What technologies do you use?",
    answer:
      "I build with PHP, Laravel, Java Spring Boot, C# .NET, and Vue.js, using MySQL or PostgreSQL for data, and deploy with AWS, Docker, and GitHub Actions.",
  },
  {
    id: "international",
    question: "Do you work with international clients?",
    answer:
      "Yes. I'm based in Cambodia and work with clients worldwide through Telegram, email, or a messaging service that works for you.",
  },
];
