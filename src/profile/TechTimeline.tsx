import { motion } from "framer-motion";
import { useState } from "react";

export type CareerItem = {
  year: string;
  role: string;
  company: string;
  icon: React.ReactNode;
  tech: string[];
  details: string;
};

interface TechTimelineProps {
  careerData: CareerItem[];
}

export function TechTimeline({ careerData }: TechTimelineProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="p-6 overflow-x-auto w-full mx-auto">
      <div className="flex flex-col space-x-2 md:flex-row md:space-x-8 md:space-y-6">
        {careerData.map((item, index) => (
          <motion.div
            key={index}
            className="relative flex flex-col items-center cursor-pointer"
            onClick={() => setSelected(selected === index ? null : index)}
            whileHover={{ scale: 1.1 }}
          >
            <div className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg">
              {item.icon}{" "}
              <span className="text-nowrap font-semibold">{item.year}</span>
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
