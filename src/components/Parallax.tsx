import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";

interface ParallaxProps {
  children?: React.ReactNode;
  className?: string;
}

interface LayerProps {
  speed: number;
  className?: string;
  children: React.ReactNode;
}

// Auto-animated layer that doesn't require scrolling
const AutoParallaxLayer: React.FC<LayerProps> = ({
  speed,
  className,
  children,
}) => {
  // Calculate duration based on speed (slower speed = longer duration)
  const duration = 20 / speed;

  return (
    <motion.div
      className={clsx(["absolute", "w-full", className])}
      animate={{
        y: [0, -100 * speed, 0],
      }}
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

const ParallaxContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={clsx(["relative", "overflow-hidden", className])}>
      {children}
    </div>
  );
};

export const Parallax: React.FC<ParallaxProps> = () => {
  return (
    <div className={clsx(["h-screen", "w-full"])}>
      {/* Fixed header */}
      <header
        className={clsx([
          "fixed",
          "top-0",
          "w-full",
          "bg-white",
          "bg-opacity-80",
          "z-50",
          "p-4",
          "shadow-md",
        ])}
      >
        <nav
          className={clsx([
            "max-w-6xl",
            "mx-auto",
            "flex",
            "justify-between",
            "items-center",
          ])}
        >
          <div className={clsx(["text-2xl", "font-bold", "text-indigo-600"])}>
            Parallax Site
          </div>
          <ul className={clsx(["flex", "space-x-6"])}>
            <li
              className={clsx(["hover:text-indigo-600", "transition-colors"])}
            >
              Home
            </li>
            <li
              className={clsx(["hover:text-indigo-600", "transition-colors"])}
            >
              About
            </li>
            <li
              className={clsx(["hover:text-indigo-600", "transition-colors"])}
            >
              Services
            </li>
            <li
              className={clsx(["hover:text-indigo-600", "transition-colors"])}
            >
              Contact
            </li>
          </ul>
        </nav>
      </header>

      {/* Parallax section with auto-animation */}
      <ParallaxContainer className={clsx(["h-screen"])}>
        {/* Background layer - moves slowest */}
        <AutoParallaxLayer speed={0.1} className={clsx(["h-screen"])}>
          <div
            className={clsx([
              "w-full",
              "h-full",
              "bg-gradient-to-b",
              "from-blue-500",
              "to-purple-500",
            ])}
          />
        </AutoParallaxLayer>

        {/* Mountains layer */}
        <AutoParallaxLayer speed={0.3} className={clsx(["h-screen"])}>
          <div className={clsx(["absolute", "bottom-0", "w-full"])}>
            <svg viewBox="0 0 1440 320" className={clsx(["w-full"])}>
              <path
                fill="#6366f1"
                fillOpacity="0.8"
                d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </AutoParallaxLayer>

        {/* Clouds layer */}
        <AutoParallaxLayer speed={0.5} className={clsx(["h-screen"])}>
          <div
            className={clsx([
              "absolute",
              "top-40",
              "left-20",
              "w-32",
              "h-16",
              "bg-white",
              "rounded-full",
              "opacity-70",
            ])}
          ></div>
          <div
            className={clsx([
              "absolute",
              "top-60",
              "left-60",
              "w-48",
              "h-20",
              "bg-white",
              "rounded-full",
              "opacity-70",
            ])}
          ></div>
          <div
            className={clsx([
              "absolute",
              "top-20",
              "right-40",
              "w-40",
              "h-16",
              "bg-white",
              "rounded-full",
              "opacity-70",
            ])}
          ></div>
        </AutoParallaxLayer>

        {/* Foreground layer - moves fastest */}
        <AutoParallaxLayer speed={0.8} className={clsx(["h-screen"])}>
          <div className={clsx(["absolute", "bottom-0", "w-full"])}>
            <svg viewBox="0 0 1440 320" className={clsx(["w-full"])}>
              <path
                fill="#4f46e5"
                fillOpacity="0.9"
                d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </AutoParallaxLayer>

        {/* Content section (static) */}
        <div className={clsx(["relative", "z-10", "h-screen"])}>
          <section
            className={clsx([
              "h-screen",
              "flex",
              "items-center",
              "justify-center",
            ])}
          >
            <div className={clsx(["text-center", "text-white"])}>
              <h1 className={clsx(["text-6xl", "font-bold", "mb-4"])}>
                Parallax Experience
              </h1>
              <p className={clsx(["text-xl", "mb-8", "max-w-2xl", "mx-auto"])}>
                Auto-animated parallax effect with multiple layers moving at
                different speeds.
              </p>
              <button
                className={clsx([
                  "bg-white",
                  "text-indigo-600",
                  "px-6",
                  "py-3",
                  "rounded-full",
                  "font-bold",
                  "hover:bg-indigo-100",
                  "transition-colors",
                ])}
              >
                Get Started
              </button>
            </div>
          </section>
        </div>
      </ParallaxContainer>
    </div>
  );
};
