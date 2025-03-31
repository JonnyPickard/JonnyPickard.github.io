import { ToggleButton } from "@/components";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  Drawer as ShadcnDrawer,
} from "./shadcn/drawer";

interface DrawerProps {
  children: React.ReactNode;
  triggerClassName?: string;
  contentClassName?: string;
  TriggerButton?: React.ReactNode;
  initialIsOpen?: boolean;
  showHandle?: boolean;
  direction?: "bottom" | "right";
  openDrawerTooltip?: string;
  closeDrawerTooltip?: string;
  customOpenIcon?: string;
  customCloseIcon?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  children,
  triggerClassName,
  contentClassName,
  TriggerButton,
  initialIsOpen = false,
  showHandle,
  direction = "bottom",
  openDrawerTooltip = "Open",
  closeDrawerTooltip = "Close",
  customOpenIcon,
  customCloseIcon,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const renderToggleButton = (
    positionClass: string,
    isVisible: boolean = true,
    duration: number = 0.2,
    direction: "bottom" | "right" = "bottom",
  ) => {
    const directionMap = {
      bottom: "up",
      right: "right",
    } as const;

    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key={"toggle-button"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
          >
            <ToggleButton
              size="lg"
              isOpen={isOpen}
              onClick={handleToggle}
              direction={directionMap[direction]}
              tooltipOpen={openDrawerTooltip}
              tooltipClose={closeDrawerTooltip}
              customOpenIcon={customOpenIcon}
              customCloseIcon={customCloseIcon}
              className={clsx([positionClass, triggerClassName])}
            />
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <>
      <ShadcnDrawer
        direction={direction}
        open={isOpen}
        onOpenChange={setIsOpen}
        {...props}
      >
        {direction === "right"
          ? renderToggleButton(
              "absolute top-1/2 -translate-y-1/2 right-0 z-50",
              // Fades in after closing the drawer
              !isOpen,
              1,
              direction,
            )
          : renderToggleButton("")}

        <DrawerContent
          showHandle={showHandle}
          className={clsx(["dark", contentClassName])}
        >
          {/* Toggle button overlaying the drawer border */}
          {direction === "right" &&
            renderToggleButton(
              "absolute top-1/2 -translate-y-1/2 -left-5 z-50",
              isOpen,
            )}
          {children}
        </DrawerContent>
      </ShadcnDrawer>
    </>
  );
};

// Re-export other components for convenience
export {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
};
