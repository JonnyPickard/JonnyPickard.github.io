import { Icon } from "@iconify/react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
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
        className={cn(
          [
            "focus-visible:border-ring",
            "focus-visible:ring-ring/50",
            "flex",
            "flex-1",
            "items-start",
            "justify-between",
            "gap-4",
            "py-4",
            "text-left",
            "text-sm",
            "font-medium",
            "transition-all",
            "outline-none",
            "focus-visible:ring-[3px]",
            "disabled:pointer-events-none",
            "disabled:opacity-50",
            "[&[data-state=open]>svg]:rotate-180",
          ],
          className,
        )}
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
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        [
          "data-[state=closed]:animate-accordion-up",
          "data-[state=open]:animate-accordion-down",
          "overflow-hidden",
          "text-sm",
        ],
        className,
      )}
      {...props}
    >
      <div className={cn(["pt-0", "pb-4"], className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
