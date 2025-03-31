import { ToggleButton } from "@/components";
import clsx from "clsx";
import { useState } from "react";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  Drawer as ShadcnDrawer,
  DrawerProps as ShadcnDrawerProps,
} from "./shadcn/drawer";

interface DrawerProps {
  children: React.ReactNode;
  triggerClassName?: string;
  contentClassName?: string;
  TriggerButton?: React.ReactNode;
  initialIsOpen?: boolean;
  showHandle?: boolean;
  direction?: ShadcnDrawerProps["direction"];
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
  direction = "right",
  openDrawerTooltip = "Open",
  closeDrawerTooltip = "Close",
  customOpenIcon,
  customCloseIcon,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const renderToggleButton = (positionClass: string) => (
    <ToggleButton
      size="lg"
      isOpen={isOpen}
      onClick={handleToggle}
      direction={customOpenIcon ? "vertical" : "horizontal"}
      tooltipOpen={openDrawerTooltip}
      tooltipClose={closeDrawerTooltip}
      customOpenIcon={customOpenIcon}
      customCloseIcon={customCloseIcon}
      className={clsx([positionClass, triggerClassName])}
    />
  );

  return (
    <>
      <ShadcnDrawer
        direction={direction}
        open={isOpen}
        onOpenChange={setIsOpen}
        {...props}
      >
        {direction === "right"
          ? renderToggleButton("absolute top-1/2 -translate-y-1/2 right-0 z-50")
          : renderToggleButton("")}

        <DrawerContent
          showHandle={showHandle}
          className={clsx(["dark", contentClassName])}
        >
          {direction === "right" &&
            renderToggleButton(
              "absolute top-1/2 -translate-y-1/2 -left-5 z-50",
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
