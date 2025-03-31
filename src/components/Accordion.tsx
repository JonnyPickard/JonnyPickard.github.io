import clsx from "clsx";
import * as React from "react";
import { useState } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as ShadcnAccordion,
} from "./shadcn/accordion";

type AccordionProps = {
  items: { title: string | React.ReactNode; content: React.ReactNode }[];
  defaultValue?: string;
  collapsible?: boolean;
};

export const Accordion: React.FC<AccordionProps> = ({
  items,
  collapsible = true,
}) => {
  const [openValue, setOpenValue] = useState<string | undefined>();

  return (
    <ShadcnAccordion
      type="single"
      value={openValue}
      onValueChange={(value) => setOpenValue(value)}
      collapsible={collapsible}
      className={clsx(["w-full", "max-w-md", "shadow-lg"])}
    >
      {items.map((item, index) => {
        const isOpen =
          openValue ===
          (typeof item.title === "string" ? item.title : `item-${index}`);

        return (
          <AccordionItem
            key={index}
            value={
              typeof item.title === "string" ? item.title : `item-${index}`
            }
            className={clsx([
              "border-b",
              "last:border-b-0",
              "border-b-gray-600",
            ])}
          >
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
                "text-sm",
                "text-gray-200",
                "bg-gray-800",
                "py-4",
                "px-2",
              ])}
              isOpen={isOpen}
              contentKey={`accordion-content-${index}`}
            >
              {item.content}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </ShadcnAccordion>
  );
};

export default Accordion;
