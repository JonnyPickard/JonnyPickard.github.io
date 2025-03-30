import { Icon } from "@iconify/react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";

import { cn } from "@/lib/utils";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn([
          "disabled:pointer-events-none",
          "disabled:opacity-50",
          "[&[data-state=open]>svg]:rotate-180",
          className,
        ])}
        {...props}
      >
        {children}
        <Icon
          className={cn([
            "text-gray-400",
            "pointer-events-none",
            "size-5",
            "shrink-0",
            "translate-y-0.5",
            "mr-2",
            "transition-transform",
            "duration-200",
          ])}
          aria-hidden
          icon={"radix-icons:chevron-down"}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  isOpen,
  contentKey,
}: React.ComponentProps<typeof AccordionPrimitive.Content> & {
  isOpen: boolean;
  contentKey: string;
}) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key={contentKey}
          animate={"open"}
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          initial="collapsed"
          exit="collapsed"
          className={cn("overflow-hidden")}
        >
          <div className={cn([className])}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
