import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";

interface LayerProps {
  speed: number;
  className?: string;
  children: React.ReactNode;
}

export const AutoParallaxLayer: React.FC<
  LayerProps & { direction?: "x" | "y"; distance?: number; reverse?: boolean }
> = ({
  speed,
  className,
  children,
  direction = "y",
  distance = 100,
  reverse = false,
}) => {
  // Calculate duration based on speed (slower speed = longer duration)
  const duration = 20 / speed;

  return (
    <motion.div
      className={clsx(["absolute", "w-full", className])}
      animate={
        direction === "y"
          ? {
              y: reverse ? [0, distance * speed, 0] : [0, -distance * speed, 0],
            }
          : {
              x: reverse ? [0, distance * speed, 0] : [0, -distance * speed, 0],
            }
      }
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
    >
      {children}
    </motion.div>
  );
};

export const ParallaxContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={clsx(["relative", "overflow-hidden", className])}>
      {children}
    </div>
  );
};
