import { motion } from "framer-motion";
import { useState } from "react";
import { FaNodeJs, FaReact } from "react-icons/fa";

import { FaAws, FaShopify, FaSwift } from "react-icons/fa";

const careerData = [
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

interface TechTimeline {
  careerData: typeof careerData;
}

export function TechTimeline() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-6 overflow-x-auto w-full max-w-4xl mx-auto">
      <div className="flex space-x-6 md:flex-col md:space-x-0 md:space-y-6">
        {careerData.map((item, index) => (
          <motion.div
            key={index}
            className="relative flex flex-col items-center cursor-pointer"
            onClick={() => setSelected(selected === index ? null : index)}
            whileHover={{ scale: 1.1 }}
          >
            <div className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg">
              {item.icon} <span className="font-semibold">{item.year}</span>
            </div>
            <div className="mt-1 text-gray-700 text-sm font-semibold">
              {item.role} @ {item.company}
            </div>
            {selected === index && (
              <motion.div
                className="mt-2 p-4 bg-gray-100 rounded-lg shadow-lg text-sm w-64"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <p className="text-gray-800">{item.details}</p>
                <div className="mt-2 text-xs text-gray-600 flex flex-wrap gap-2">
                  {item.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-blue-200 text-blue-800 px-2 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
