import { motion } from "framer-motion";
import { useState } from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/shadcn/popover";

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
		<div className="p-6 overflow-x-auto w-full  bg-gray-900 text-gray-100 rounded-lg">
			<div className="flex flex-col gap-8 md:flex-row md:gap-x-8 md:gap-y-6">
				{careerData.map((item, index) => (
					<motion.div
						key={index}
						className="relative flex flex-col items-center cursor-pointer min-w-[200px]"
						whileHover={{ scale: 1.1 }}
					>
						<Popover
							onOpenChange={(open) => {
								if (!open) setSelected(() => null);
							}}
						>
							<PopoverTrigger asChild>
								<div
									className="flex items-center gap-x-2 bg-gray-800 text-gray-100 px-4 py-2 rounded-lg shadow-lg"
									onClick={() => setSelected(selected === index ? null : index)}
								>
									{item.icon}{" "}
									<span className="text-nowrap font-semibold">{item.year}</span>
								</div>
							</PopoverTrigger>
							{selected === index && (
								<PopoverContent className="dark">
									<motion.div
										className="p-4 bg-gray-800 text-gray-100 rounded-lg shadow-lg text-sm w-64"
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 10 }}
									>
										<p className="text-gray-300">{item.details}</p>
										<div className="mt-2 text-xs text-gray-400 flex flex-wrap gap-2">
											{item.tech.map((tech, i) => (
												<span
													key={i}
													className="bg-blue-500 text-gray-100 px-2 py-1 rounded-md"
												>
													{tech}
												</span>
											))}
										</div>
									</motion.div>
								</PopoverContent>
							)}
						</Popover>
						<div className="mt-1 text-gray-300 text-sm font-semibold text-center">
							<div>{item.role}</div>
							<div className="text-gray-400">{item.company}</div>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
}
