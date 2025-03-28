import React from "react";
import {
  SiAmazonwebservices,
  SiDocker,
  SiGraphql,
  SiJest,
  SiReact,
  SiTypescript,
} from "react-icons/si";

type Skill = {
  name: string;
  level: number;
  icon: React.ComponentType<{ className?: string }>;
};

type SkillCategory = {
  category: string;
  skills: Skill[];
};

const skillCategories: SkillCategory[] = [
  {
    category: "Frontend Development",
    skills: [
      { name: "React", level: 95, icon: SiReact },
      { name: "TypeScript", level: 90, icon: SiTypescript },
      { name: "Next.js", level: 85, icon: SiReact },
      { name: "React Query", level: 80, icon: SiReact },
    ],
  },
  {
    category: "Infrastructure & DevOps",
    skills: [
      { name: "AWS", level: 85, icon: SiAmazonwebservices },
      { name: "Docker", level: 80, icon: SiDocker },
      { name: "CI/CD", level: 75, icon: SiDocker },
    ],
  },
  {
    category: "Testing",
    skills: [
      { name: "Jest", level: 90, icon: SiJest },
      { name: "Cypress", level: 85, icon: SiJest },
      { name: "React Testing Library", level: 80, icon: SiJest },
    ],
  },
  {
    category: "Backend & APIs",
    skills: [
      { name: "GraphQL", level: 75, icon: SiGraphql },
      { name: "Node.js", level: 70, icon: SiGraphql },
    ],
  },
];

type SkillBarProps = {
  name: string;
  level: number;
  Icon: React.ComponentType<{ className?: string }>;
};

const SkillBar: React.FC<SkillBarProps> = ({ name, level, Icon }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {Icon && <Icon className="mr-2 text-xl text-blue-600" />}
          <span className="font-medium text-gray-700">{name}</span>
        </div>
        <span className="text-sm text-gray-600">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 rounded-full h-2.5 transition-all duration-500 ease-in-out"
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );
};

export const SkillBars: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Professional Skills
      </h2>
      {skillCategories.map((category, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
            {category.category}
          </h3>
          {category.skills.map((skill, skillIndex) => (
            <SkillBar
              key={skillIndex}
              name={skill.name}
              level={skill.level}
              Icon={skill.icon}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
