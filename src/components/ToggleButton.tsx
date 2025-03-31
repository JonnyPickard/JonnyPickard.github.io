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
  size?: "default" | "sm" | "lg";
}

interface AnimatedIconProps {
  icon: string;
  direction: ToggleButtonProps["direction"];
  size: ToggleButtonProps["size"];
}

const sizeMap = {
  sm: {
    icon: "size-[16px]",
    button: "size-[24px]",
  },
  default: {
    icon: "size-[24px]",
    button: "size-[32px]",
  },
  lg: {
    icon: "size-[32px]",
    button: "size-[40px]",
  },
};

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  icon,
  direction,
  size = "default",
}) => {
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
        className={clsx([sizeMap[size].icon, "pointer-events-none"])}
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
  size = "default",
}) => {
  return (
    <Button
      variant="rounded"
      onClick={onClick}
      tooltip={isOpen ? "Close" : "Open"}
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
        "transition-opacity",
        "duration-300",
        "text-slate-50",
        "relative",
        sizeMap[size].button,
        className,
      ])}
    >
      <AnimatePresence initial={false}>
        {isOpen ? (
          <AnimatedIcon
            direction={direction}
            icon="radix-icons:cross-2"
            size={size}
          />
        ) : (
          <AnimatedIcon
            direction={direction}
            icon="radix-icons:row-spacing"
            size={size}
          />
        )}
      </AnimatePresence>
    </Button>
  );
};
