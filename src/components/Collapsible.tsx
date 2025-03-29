import { Icon } from "@iconify/react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import clsx from "clsx";
import * as React from "react";
import { Button } from "./Button";

const RowSpacingIcon = () => (
  <Icon
    className="text-white dark:text-slate-100"
    icon={"radix-icons:row-spacing"}
  />
);

const Cross2Icon = () => (
  <Icon
    className="text-white dark:text-slate-100"
    icon={"radix-icons:cross-2"}
  />
);

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
        className={clsx(
          "gap-4",
          "flex",
          "items-center",
          "justify-between",
          "p-4",
          "bg-gray-700",
          "shadow-md",
          "cursor-pointer",
          "min-h-[56px]",
        )}
        onClick={() => setOpen(!open)}
      >
        {typeof Title === "string" ? (
          <span className={clsx("text-sm", "font-medium", "text-gray-100")}>
            {Title}
          </span>
        ) : (
          Title
        )}
        <CollapsiblePrimitive.Trigger asChild>
          <Button
            variant="rounded"
            size="icon"
            className={clsx(
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
            )}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
          >
            {open ? <Cross2Icon /> : <RowSpacingIcon />}
          </Button>
        </CollapsiblePrimitive.Trigger>
      </div>

      <CollapsiblePrimitive.Content
        className={clsx(
          "CollapsibleContent",
          "p-4",
          "bg-gray-800",
          "shadow-lg",
          "text-gray-200",
          "w-full",
          "h-full",
          "overflow-hidden",
        )}
      >
        {children}
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  );
};
