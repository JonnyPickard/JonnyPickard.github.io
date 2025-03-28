import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import ZustandIcon from "../assets/icons/zustand.svg?react";

type Skill = {
  name: string;
  level: number;
  icon?: string; // Iconify icon string
  iconComponent?: React.FC<React.SVGProps<SVGSVGElement>>; // Custom SVG component
};

type SkillCategory = {
  category: string;
  skills: Skill[];
};

const skillCategories: SkillCategory[] = [
  {
    category: "Frontend Development",
    skills: [
      { name: "JavaScript", level: 90, icon: "skill-icons:javascript" },
      { name: "TypeScript", level: 90, icon: "logos:typescript-icon" },
      { name: "React", level: 95, icon: "logos:react" },
      { name: "Zustand", level: 80, iconComponent: ZustandIcon },
      { name: "React Native", level: 70, icon: "devicon:reactnative-wordmark" },
      { name: "React Query", level: 85, icon: "logos:react-query-icon" },
      { name: "Next.js", level: 80, icon: "logos:nextjs-icon" },
      { name: "Redux", level: 85, icon: "logos:redux" },
      { name: "React Router", level: 80, icon: "logos:react-router" },
      { name: "Apollo Client", level: 75, icon: "skill-icons:apollo" },
      { name: "Capacitor", level: 75, icon: "logos:capacitorjs-icon" },
      { name: "MUI", level: 85, icon: "logos:material-ui" },
      { name: "Chakra UI", level: 85, icon: "devicon:chakraui" },
      { name: "Storybook", level: 90, icon: "devicon:storybook" },
    ],
  },
  {
    category: "Styling",
    skills: [
      { name: "CSS", level: 90, icon: "simple-icons:css" },
      { name: "SCSS", level: 85, icon: "devicon:sass" },
      {
        name: "Styled Components",
        level: 90,
        icon: "devicon:styledcomponents",
      },
      { name: "Tailwind", level: 85, icon: "logos:tailwindcss-icon" },
    ],
  },
  {
    category: "Infrastructure & DevOps",
    skills: [
      { name: "AWS", level: 85, icon: "skill-icons:aws-light" },
      { name: "Docker", level: 80, icon: "logos:docker-icon" },
      { name: "Git ", level: 85, icon: "devicon:git" },
      { name: "GitHub ", level: 85, icon: "simple-icons:github" },
      { name: "GitHub Actions ", level: 75, icon: "logos:github-actions" },
      { name: "Jenkins", level: 80, icon: "logos:jenkins" },
      { name: "CircleCI", level: 75, icon: "cib:circleci" },
      { name: "Datadog", level: 75, icon: "vscode-icons:file-type-datadog" },
      { name: "Sentry", level: 70, icon: "skill-icons:sentry" },
      { name: "CloudWatch", level: 70, icon: "logos:aws-cloudwatch" },
      { name: "Splunk", level: 50, icon: "simple-icons:splunk" },
    ],
  },
  {
    category: "Testing",
    skills: [
      { name: "Vitest", level: 90, icon: "logos:vitest" },
      { name: "Jest", level: 85, icon: "logos:jest" },
      { name: "Cypress", level: 80, icon: "skill-icons:cypress-light" },
      {
        name: "React Testing Library",
        level: 90,
        icon: "logos:testing-library",
      },
      { name: "MSW", level: 85, icon: "logos:msw" },
      { name: "Percy", level: 75, icon: "logos:percy-icon" },
      { name: "Chromatic", level: 70, icon: "logos:chromatic-icon" },
      { name: "BrowserStack", level: 70, icon: "devicon:browserstack" },
    ],
  },
  {
    category: "Backend & APIs",
    skills: [
      { name: "GraphQL", level: 75, icon: "logos:graphql" },
      { name: "Node.js", level: 70, icon: "logos:nodejs-icon" },
      { name: "Express.js", level: 70, icon: "skill-icons:expressjs-light" },
      { name: "REST", level: 80, icon: "hugeicons:api" },
      { name: "OpenAPI", level: 75, icon: "logos:openapi-icon" },
      { name: "Swagger", level: 75, icon: "logos:swagger" },
      { name: "Postman", level: 85, icon: "logos:postman-icon" },
      { name: "PostgreSQL", level: 70, icon: "logos:postgresql" },
      { name: "MongoDB", level: 75, icon: "logos:mongodb-icon" },
      { name: "DynamoDB", level: 70, icon: "logos:aws-dynamodb" },
    ],
  },
  {
    category: "Build Tools",
    skills: [
      { name: "Vite", level: 90, icon: "logos:vitejs" },
      { name: "Webpack", level: 80, icon: "logos:webpack" },
      { name: "Rollup", level: 75, icon: "logos:rollupjs" },
    ],
  },
  {
    category: "Analytics",
    skills: [
      { name: "Google Analytics", level: 80, icon: "logos:google-analytics" },
      { name: "Mixpanel", level: 75, icon: "simple-icons:mixpanel" },
    ],
  },
];

type SkillBarProps = {
  name: string;
  level: number;
  icon?: string;
  IconComponent?: React.FC<React.SVGProps<SVGSVGElement>>;
};

const SkillBar: React.FC<SkillBarProps> = ({
  name,
  level,
  icon,
  IconComponent,
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Tooltip>
            <TooltipTrigger>
              {IconComponent ? (
                <IconComponent
                  width={24}
                  className="mr-2 text-xl text-white dark:text-slate-100"
                />
              ) : (
                icon && (
                  <Icon
                    className="mr-2 text-xl text-white dark:text-slate-100"
                    icon={icon}
                  />
                )
              )}
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
                IconComponent={skill.iconComponent}
                icon={skill.icon}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
