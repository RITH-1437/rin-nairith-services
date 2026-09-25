export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    id: "cost",
    question: "How much does a project cost?",
    answer:
      "It depends on the type and complexity of the project. Starting packages are listed on this page, and we provide a clearer estimate after discussing your requirements.",
  },
  {
    id: "time",
    question: "How long does development take?",
    answer:
      "Timing depends on the scope, features, and decisions made during the project. We agree on a realistic timeline before implementation begins.",
  },
  {
    id: "scope",
    question: "Can you work on an existing product?",
    answer:
      "Yes. We can help with a new build, a redesign, or specific improvements to an existing website, application, or internal system.",
  },
  {
    id: "backend-cloud",
    question: "Do you handle backend, APIs, and cloud deployment?",
    answer:
      "Yes. We build RESTful APIs, backend systems, and databases, and deploy applications using tools such as AWS, Docker, Nginx, Linux, and CI/CD workflows.",
  },
  {
    id: "maintenance",
    question: "Can you maintain software after launch?",
    answer:
      "Yes. Ongoing support can include bug fixes, performance improvements, deployment updates, and new features after launch.",
  },
  {
    id: "technologies",
    question: "Which technologies do you work with?",
    answer:
      "We work with technologies including HTML, CSS, JavaScript, Vue.js, PHP, Laravel, Java Spring Boot, C# .NET, MySQL, PostgreSQL, AWS, Docker, and GitHub Actions.",
  },
  {
    id: "communication",
    question: "How can we start a conversation?",
    answer:
      "Send a project brief through the contact form, or reach us by email or Telegram. Include your goal, required features, and any important deadlines.",
  },
];
