import clsx from "clsx";
import * as React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as ShadcnAccordion,
} from "./shadcn/accordion";

type AccordionProps = {
  items: { title: string; content: React.ReactNode }[];
  defaultValue?: string;
  collapsible?: boolean;
};

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultValue,
  collapsible = true,
}) => {
  return (
    <ShadcnAccordion
      type="single"
      defaultValue={defaultValue}
      collapsible={collapsible}
      className={clsx(["w-full", "max-w-md"])}
    >
      {items.map((item, index) => (
        <AccordionItem key={index} value={item.title}>
          <AccordionTrigger
            className={clsx([
              "flex",
              "w-full",
              "items-center",
              "justify-between",
              "p-4",
              "text-sm",
              "font-medium",
              "text-gray-100",
              "bg-gray-700",
              "hover:bg-gray-600",
              "focus:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-blue-500",
            ])}
          >
            {item.title}
          </AccordionTrigger>
          <AccordionContent
            className={clsx([
              "p-2",
              "bg-gray-800",
              "text-gray-200",
              "w-full",
              "h-full",
              "overflow-hidden",
            ])}
          >
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </ShadcnAccordion>
  );
};

export default Accordion;
