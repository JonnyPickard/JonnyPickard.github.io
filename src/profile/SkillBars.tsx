import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";
import { Icon } from "@iconify/react";
import React, { useState } from "react";

type Skill = {
  name: string;
  level: number;
  icon: string; // Iconify icon string
};

type SkillCategory = {
  category: string;
  skills: Skill[];
};

const skillCategories: SkillCategory[] = [
  {
    category: "Frontend Development",
    skills: [
      { name: "React", level: 95, icon: "logos:react" },
      { name: "TypeScript", level: 90, icon: "logos:typescript-icon" },
      { name: "Next.js", level: 85, icon: "logos:nextjs-icon" },
      { name: "React Query", level: 80, icon: "logos:react-query-icon" },
    ],
  },
  {
    category: "Infrastructure & DevOps",
    skills: [
      { name: "AWS", level: 85, icon: "logos:aws" },
      { name: "Docker", level: 80, icon: "logos:docker-icon" },
      { name: "CI/CD", level: 75, icon: "logos:github-actions" },
    ],
  },
  {
    category: "Testing",
    skills: [
      { name: "Vitest", level: 90, icon: "logos:vitest" },
      { name: "Jest", level: 90, icon: "logos:jest" },
      { name: "Cypress", level: 85, icon: "logos:cypress" },
      {
        name: "React Testing Library",
        level: 80,
        icon: "logos:testing-library",
      },
    ],
  },
  {
    category: "Backend & APIs",
    skills: [
      { name: "GraphQL", level: 75, icon: "logos:graphql" },
      { name: "Node.js", level: 70, icon: "logos:nodejs-icon" },
    ],
  },
];

type SkillBarProps = {
  name: string;
  level: number;
  icon: string;
};

const SkillBar: React.FC<SkillBarProps> = ({ name, level, icon }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Tooltip>
            <TooltipTrigger>
              <Icon
                className="mr-2 text-xl text-blue-600 dark:text-blue-400"
                icon={icon}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-gray-800 text-gray-100">
              Proficiency: {level}%
            </TooltipContent>
          </Tooltip>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {name}
          </span>
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {level}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-400 dark:to-green-400 rounded-full h-2.5 transition-all duration-500 ease-in-out"
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );
};

export const SkillBars: React.FC = () => {
  const [search, setSearch] = useState("");

  const filteredCategories = skillCategories.map((category) => ({
    ...category,
    skills: category.skills.filter((skill) =>
      skill.name.toLowerCase().includes(search.toLowerCase()),
    ),
  }));

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 shadow-lg rounded-lg dark">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-100">
        Professional Skills
      </h2>
      <input
        type="text"
        placeholder="Search skills..."
        className="w-full p-2 mb-6 border rounded bg-gray-800 text-gray-300 border-gray-600"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredCategories.map((category, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-300 border-b pb-2 flex items-center">
            <Icon className="mr-2 text-blue-400" icon="mdi:web" />
            {category.category}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {category.skills.map((skill, skillIndex) => (
              <SkillBar
                key={skillIndex}
                name={skill.name}
                level={skill.level}
                icon={skill.icon}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="text-center mt-8">
        <a
          href="/Users/jonny/Documents/Jobhunting/JonnyPickardResume2025.pdf"
          download
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Download Resume
        </a>
      </div>
    </div>
  );
};
