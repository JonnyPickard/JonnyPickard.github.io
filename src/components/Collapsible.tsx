import { Icon } from "@iconify/react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import { Button } from "./Button";

type CollapsibleProps = {
  Title: string | React.ReactNode;
  children: React.ReactNode;
};

export const Collapsible: React.FC<CollapsibleProps> = ({
  Title,
  children,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <CollapsiblePrimitive.Root open={open} onOpenChange={setOpen}>
      <div
        className={clsx([
          "gap-4",
          "flex",
          "items-center",
          "justify-between",
          "p-4",
          "bg-gray-700",
          "shadow-md",
          "cursor-pointer",
          "min-h-[56px]",
        ])}
        onClick={() => setOpen(!open)}
      >
        {typeof Title === "string" ? (
          <span className={clsx(["text-sm", "font-medium", "text-gray-100"])}>
            {Title}
          </span>
        ) : (
          Title
        )}
        <CollapsiblePrimitive.Trigger asChild>
          <Button
            variant="rounded"
            size="icon"
            className={clsx([
              "bg-gradient-to-r",
              "from-blue-500",
              "to-emerald-600",
              "text-white",
              "hover:from-blue-400",
              "hover:to-emerald-400",
              "focus:ring-blue-500",
              "dark:from-blue-600",
              "dark:to-emerald-600",
              "dark:hover:from-blue-500",
              "dark:hover:to-emerald-600",
              "min-h-[32px]",
              "min-w-[32px]",
              "relative",
              "transition-opacity",
              "duration-300",
            ])}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(() => !open);
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.div
                  key="cross"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className={clsx(["absolute"])}
                >
                  <Icon
                    className={clsx([
                      "text-white",
                      "dark:text-slate-100",
                      "size-[24px]",
                    ])}
                    icon={"radix-icons:cross-2"}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="row-spacing"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className={clsx(["absolute"])}
                >
                  <Icon
                    className={clsx([
                      "text-white",
                      "dark:text-slate-100",
                      "size-[24px]",
                    ])}
                    icon={"radix-icons:row-spacing"}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </CollapsiblePrimitive.Trigger>
      </div>

      <CollapsiblePrimitive.Content
        className={clsx([
          "p-2",
          "bg-gray-800",
          "shadow-lg",
          "text-gray-200",
          "w-full",
          "h-full",
          "overflow-hidden",
        ])}
      >
        {children}
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  );
};
