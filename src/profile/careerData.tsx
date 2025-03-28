import { FaAws, FaNodeJs, FaReact, FaShopify, FaSwift } from "react-icons/fa";
import type { CareerItem } from "./TechTimeline";

export const careerData: CareerItem[] = [
  {
    year: "2024 - Present",
    role: "Senior Frontend Engineer",
    company: "Tenzo",
    icon: <FaReact />,
    tech: [
      "React",
      "Vitest",
      "TypeScript",
      "Capacitor",
      "React Query",
      "MUI",
      "Django",
    ],
    details:
      "Delivered an enterprise email analytics system using AWS Lambda and React Email. Led a web-to-mobile transformation initiative, replacing a React Native app with a Capacitor-based hybrid app, improving maintainability and performance. Established comprehensive engineering standards and reduced development cycle time by ~30%. Mentored a team of 3 developers.",
  },
  {
    year: "2022 - 2023",
    role: "Frontend Engineer (Freelance)",
    company: "Cold Cuts // HotWax",
    icon: <FaShopify />,
    tech: ["React", "Vite", "Vitest", "TypeScript", "GraphQL", "Shopify"],
    details:
      "Designed and developed a React-based music player, focusing on performance and UX. Led the redesign and optimization of a major portion of the frontend. Built automated inventory management solutions and improved SEO performance.",
  },
  {
    year: "2019 - 2022",
    role: "Frontend Engineer",
    company: "Not on the High Street",
    icon: <FaReact />,
    tech: [
      "React",
      "NextJS",
      "TypeScript",
      "AWS",
      "Jenkins",
      "Docker",
      "Datadog",
      "Jest",
      "Percy",
      "Confluence",
    ],
    details:
      "Rebuilt key frontend pages and established company-wide frontend standards. Developed a component library for design standardization and implemented infrastructure solutions for logging, monitoring, and deployments.",
  },
  {
    year: "2019",
    role: "Frontend Engineer",
    company: "Bright Analytics",
    icon: <FaReact />,
    tech: ["React", "TypeScript", "Webpack", "Jest", "Storybook"],
    details:
      "Developed frontend solutions using React and TypeScript, focusing on maintainability and performance.",
  },
  {
    year: "2018",
    role: "Frontend Engineer (Contract)",
    company: "Reason",
    icon: <FaNodeJs />,
    tech: ["React", "Node", "Jest", "Camunda BPMN"],
    details:
      "Worked on frontend and backend integrations using React and Node.js.",
  },
  {
    year: "2017 - 2018",
    role: "Frontend Engineer",
    company: "Haymarket Media - Whatcar?",
    icon: <FaReact />,
    tech: [
      "React",
      "Redux",
      "Jest",
      "Storybook",
      "Webpack",
      "AWS",
      "Jenkins",
      "Docker",
      "Node",
      "Swagger",
    ],
    details:
      "Implemented a site-wide redesign using React and Redux. Developed a component library and optimized page speed. Built new React-based web apps and integrated AWS-based solutions.",
  },
  {
    year: "2017",
    role: "Platform Engineer",
    company: "Compare the Market",
    icon: <FaAws />,
    tech: [
      "Node",
      "Docker",
      "AWS",
      "MongoDB",
      "GOCD",
      "Swagger",
      "NGINX",
      "Lua",
    ],
    details:
      "Prototyped re-platforming solutions using Node.js and Dockerized microservices deployed to AWS. Implemented JWT-based authentication and monitoring solutions.",
  },
  {
    year: "2016",
    role: "iOS Engineer (Contract)",
    company: "Transparency Data Ltd",
    icon: <FaSwift />,
    tech: ["Swift", "Xcode"],
    details: "Developed iOS applications using Swift and Xcode.",
  },
];
