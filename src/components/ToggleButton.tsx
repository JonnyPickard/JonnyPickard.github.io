import { Icon } from "@iconify/react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Button } from "./Button";

interface ToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  direction?: "horizontal" | "vertical";
}

interface AnimatedIconProps {
  icon: string;
  direction: ToggleButtonProps["direction"];
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ icon, direction }) => {
  return (
    <motion.div
      key={icon}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={clsx([
        "absolute",
        "flex",
        "items-center",
        "justify-center",
        direction === "vertical" ? "rotate-0" : "rotate-90",
        "size-full",
      ])}
    >
      <Icon
        className={clsx(["size-[24px]", "pointer-events-none"])}
        icon={icon}
      />
    </motion.div>
  );
};

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  isOpen,
  onClick,
  className,
  direction = "vertical",
}) => {
  return (
    <Button
      variant="rounded"
      size="icon"
      onClick={onClick}
      className={clsx([
        "bg-gradient-to-r",
        "from-blue-500",
        "to-emerald-600",
        "hover:from-blue-400",
        "hover:to-emerald-400",
        "dark:from-blue-600",
        "dark:to-emerald-600",
        "dark:hover:from-blue-500",
        "dark:hover:to-emerald-600",
        "text-white",
        "focus:ring-blue-500",
        "p-inset-2",
        "size-[32px]",
        "transition-opacity",
        "duration-300",
        "text-slate-50",
        "relative",
        className,
      ])}
    >
      <AnimatePresence initial={false}>
        {isOpen ? (
          <AnimatedIcon direction={direction} icon="radix-icons:cross-2" />
        ) : (
          <AnimatedIcon direction={direction} icon="radix-icons:row-spacing" />
        )}
      </AnimatePresence>
    </Button>
  );
};
