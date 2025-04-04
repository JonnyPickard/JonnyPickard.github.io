import { Icon } from "@iconify/react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Button } from "./Button";

interface ToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  size?: "default" | "sm" | "lg";
  tooltipOpen?: string;
  tooltipClose?: string;
  tooltipClassName?: string;
  customOpenIcon?: string;
  customCloseIcon?: string;
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
  direction = "down",
  size = "default",
}) => {
  const rotationMap = {
    up: "rotate-180",
    down: "rotate-0",
    left: "rotate-90",
    right: "-rotate-90",
  };

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
        rotationMap[direction],
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
  direction = "down",
  size = "default",
  tooltipOpen = "Open",
  tooltipClose = "Close",
  tooltipClassName,
  customOpenIcon,
  customCloseIcon,
}) => {
  return (
    <Button
      variant="rounded"
      onClick={onClick}
      tooltip={isOpen ? tooltipClose : tooltipOpen}
      tooltipClassName={clsx([tooltipClassName])}
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
            icon={customCloseIcon || "radix-icons:cross-2"}
            size={size}
          />
        ) : (
          <AnimatedIcon
            direction={direction}
            icon={customOpenIcon || "radix-icons:row-spacing"}
            size={size}
          />
        )}
      </AnimatePresence>
    </Button>
  );
};
