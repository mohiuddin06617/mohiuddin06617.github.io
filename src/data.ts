import { CVData } from './types';

export const cvData: CVData = {
  personal: {
    name: "Mahiuddin Ahmed",
    title: "Software Engineer",
    location: "Dhaka, Bangladesh",
    phone: "01679506617",
    email: "mohiuddin06617@gmail.com",
    github: "https://github.com/mohiuddin06617",
    portfolio: "https://mohiuddin06617.github.io",
    summary: "Experienced software engineer with a strong track record of delivering reliable and scalable solutions. Committed to driving business success through innovation, collaboration, and continuous improvement in progressive, customer-centric environments.",
  },
  experience: [
    {
      company: "GoZayaan",
      role: "Software Engineer III (Remote)",
      period: "08.2023 – Present",
      achievements: [
        "Utilized agentic coding with Claude Code on top of Spec-Driven Development to accelerate feature delivery and ensure robust system architecture.",
        "Optimized API responses, ensuring efficient flight and hotel integration catering to millions of customers.",
        "Played a pivotal role in system design discussions to elevate performance and response efficiency.",
        "Redesigned and migrated the hotel domain from a monolithic system to an event-driven microservices architecture.",
        "Implemented Horizontal Pod Autoscaling (HPA) in a GCP-hosted Kubernetes microservices architecture based on RabbitMQ queue length."
      ]
    },
    {
      company: "MeiloraWeb",
      role: "Backend Developer (Contractual) (Remote)",
      period: "05.2023 – 03.2024",
      achievements: [
        "Developed SaaS solutions with scalable PHP & Python code, including API Auth, OpenAI Integration, and Chrome Extension Development.",
        "Implemented Redis cache & queue systems and facilitated SaaS Payments."
      ]
    },
    {
      company: "UCB Fintech Ltd (upay)",
      role: "Software Engineer",
      period: "07.2021 – 08.2023",
      achievements: [
        "Designed and developed microservices in Python serving millions of customers.",
        "Developed REST APIs using Django REST Framework for seamless data exchange.",
        "Implemented Redis caching to improve data retrieval and reduce database load with configured persistence.",
        "Continuously optimized SQL and NoSQL database queries for maximum performance."
      ]
    },
    {
      company: "Creative Soft Technology",
      role: "Senior Software Engineer",
      period: "03.2021 – 07.2021",
      achievements: [
        "Led a team of 4 developers to deliver a job portal management system with high-quality, scalable code.",
        "Developed a Call & Agent Management System following domain-driven design and repository pattern in Laravel with Firebase real-time integration."
      ]
    },
    {
      company: "LightCastle Partners",
      role: "Full Stack Software Developer",
      period: "11.2019 – 02.2021",
      achievements: [
        "Developed modules following domain-driven architecture in Laravel using MySQL & MongoDB.",
        "Integrated Algolia search technology and used Celery/Redis Queue for efficient indexing.",
        "Built and deployed a forecasting system using Python and Django REST Framework."
      ]
    },
    {
      company: "Byte Trek Ltd",
      role: "Software Developer",
      period: "03.2018 – 11.2019",
      achievements: [
        "Developed a Django web application using NLP to automatically classify and reply to Google My Business reviews.",
        "Built a highly performant closest hospital locator WordPress plugin loading in under 2 seconds."
      ]
    },
    {
      company: "Freelance",
      role: "Software Developer",
      period: "01.2017 – Present",
      achievements: [
        "Built and published a Recruitment CRM and Talent Acquisition System on CodeCanyon.",
        "Developed custom payment gateway integrations (Stripe, Razorpay) and OAuth 2.0 authentications for various clients.",
        "Created a core PHP application for digital signatures and document management."
      ]
    }
  ],
  projects: [
    {
      name: "Ikig.ai",
      role: "Lead Full-Stack Engineer",
      link: "https://tryikig.ai/",
      description: "Spearheaded the technical direction and development of the platform as the project lead. Designed robust system architectures and led both the backend and frontend implementations of advanced AI-driven features.",
      technologies: ["AI Integration", "React", "TypeScript", "Node.js"]
    },
    {
      name: "Kothok.ai",
      role: "Lead Full-Stack Engineer",
      link: "https://kothok.ai/",
      description: "Led the end-to-end development of Kothok.ai from both the backend and frontend, orchestrating system design, core feature implementation, and overall technical strategy.",
      technologies: ["Generative AI", "Python", "FastAPI", "React"]
    },
    {
      name: "GoZayaan",
      role: "Software Engineer III",
      link: "https://gozayaan.com/",
      description: "Contributed to the core platform of GoZayaan, an online travel agency. Optimized API responses and redesigned the hotel domain into an event-driven microservices architecture.",
      technologies: ["Microservices", "Event-Driven Architecture", "GCP", "Kubernetes"]
    },
    {
      name: "upay",
      role: "Software Engineer",
      link: "https://www.upaybd.com/",
      description: "Worked on the core upay digital financial service product serving millions of customers. Designed and developed robust microservices and scalable REST APIs.",
      technologies: ["Python", "Django REST", "Redis", "Microservices"]
    },
    {
      name: "Soluta",
      role: "Full Stack Software Developer",
      link: "https://soluta.co/",
      description: "Worked on this platform during my tenure at LightCastle Partners, developing modules following domain-driven architecture and implementing efficient search indexing.",
      technologies: ["Laravel", "Python", "Algolia", "Vue.js"]
    },
    {
      name: "QuickRecruit SaaS (Recruitment CRM)",
      role: "Creator & Developer",
      link: "https://codecanyon.net/item/quickrecruit-saas-recruitment-crm-and-talent-acquisition-system-in-laravel/32036553",
      description: "Implemented a full-featured SaaS Recruitment CRM and Talent Acquisition System. Published on CodeCanyon to help businesses manage their hiring processes efficiently.",
      technologies: ["Laravel", "PHP", "MySQL", "SaaS"]
    },
    {
      name: "QuickRecruit (Recruitment CRM)",
      role: "Creator & Developer",
      link: "https://codecanyon.net/item/quickrecruit-recruitment-crm-and-talent-acquisition-system-in-laravel/28743337",
      description: "Developed and published a comprehensive Recruitment CRM and Talent Acquisition System on CodeCanyon for self-hosted deployments.",
      technologies: ["Laravel", "PHP", "MySQL", "JavaScript"]
    }
  ],
  skills: {
    languages: [
      { name: "Python", proficiency: 95, tooltip: "6+ years, core backend language" },
      { name: "PHP", proficiency: 85, tooltip: "5+ years, Laravel & core PHP" },
      { name: "Go", proficiency: 75, tooltip: "2+ years, microservices & high-performance APIs" },
      { name: "JavaScript", proficiency: 85, tooltip: "5+ years, frontend & Node.js" },
      { name: "HTML", proficiency: 90, tooltip: "5+ years, semantic web markup" },
      { name: "CSS", proficiency: 85, tooltip: "5+ years, styling & Tailwind CSS" },
      { name: "JSON", proficiency: 95, tooltip: "Everyday data interchange" }
    ],
    frameworks: [
      { name: "Django", proficiency: 90, tooltip: "4+ years, enterprise apps" },
      { name: "Django REST", proficiency: 90, tooltip: "4+ years, robust APIs" },
      { name: "FastAPI", proficiency: 85, tooltip: "2+ years, high-performance APIs" },
      { name: "Flask", proficiency: 80, tooltip: "3 years, lightweight services" },
      { name: "Laravel", proficiency: 85, tooltip: "4+ years, full-stack applications" },
      { name: "Vue", proficiency: 80, tooltip: "3+ years, reactive frontends" },
      { name: "Vuex", proficiency: 75, tooltip: "3 years, state management" },
      { name: "Express.js", proficiency: 75, tooltip: "3 years, Node.js backends" }
    ],
    databases: [
      { name: "PostgreSQL", proficiency: 90, tooltip: "4+ years, primary relational DB" },
      { name: "MySQL", proficiency: 85, tooltip: "5+ years, legacy & web apps" },
      { name: "MariaDB", proficiency: 85, tooltip: "3+ years, MySQL drop-in" },
      { name: "MongoDB", proficiency: 80, tooltip: "3+ years, NoSQL document store" },
      { name: "Cassandra", proficiency: 70, tooltip: "1+ year, wide-column store" }
    ],
    tools: [
      { name: "Docker", proficiency: 90, tooltip: "4+ years, containerization" },
      { name: "Kubernetes", proficiency: 85, tooltip: "3+ years, orchestration & HPA" },
      { name: "Helm", proficiency: 80, tooltip: "2+ years, K8s package management" },
      { name: "Redis", proficiency: 90, tooltip: "4+ years, caching & queues" },
      { name: "Celery", proficiency: 85, tooltip: "3+ years, async task queues" },
      { name: "RabbitMQ", proficiency: 80, tooltip: "2+ years, message brokering" },
      { name: "KEDA", proficiency: 75, tooltip: "1+ year, event-driven autoscaling" },
      { name: "MeiliSearch", proficiency: 75, tooltip: "2+ years, fast search engine" },
      { name: "GCP", proficiency: 85, tooltip: "3+ years, cloud infrastructure" }
    ]
  },
  education: [
    {
      institution: "American International University-Bangladesh",
      degree: "BSc in Computer Science and Engineering",
      period: "04.2014 – 03.2018",
      details: "CGPA: 3.51"
    },
    {
      institution: "St Joseph Higher Secondary School",
      degree: "Science / Higher Secondary Certificate",
      period: "01.2011 – 01.2013",
      details: "GPA: 4.80"
    },
    {
      institution: "AgailJhara B.H.P Academy",
      degree: "Science / Secondary School Certificate",
      period: "01.2009 – 01.2011",
      details: "GPA: 4.81"
    }
  ],
  publications: [
    {
      title: "Cataract Detection Using Convolutional Neural Network With VGG-19 Model",
      venue: "IEEE World AI IoT Congress, Seattle, USA",
      year: "2021",
      link: "https://ieeexplore.ieee.org/document/9454244"
    }
  ]
};
