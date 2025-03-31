import clsx from "clsx";
import { useState } from "react";
import { Button } from "./Button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Drawer as ShadcnDrawer,
  DrawerProps as ShadcnDrawerProps,
} from "./shadcn/drawer";

interface DrawerProps {
  children: React.ReactNode;
  triggerClassName?: string;
  contentClassName?: string;
  TriggerButton?: React.ReactNode;

  /**
   * Remap `defaultOpen` to `initialIsOpen`.
   * This standardizes the naming of the initial open state prop across the codebase.
   */
  initialIsOpen?: boolean;
  showHandle?: boolean;
  direction?: ShadcnDrawerProps["direction"];
}

export const Drawer: React.FC<DrawerProps> = ({
  children,
  triggerClassName,
  contentClassName,
  TriggerButton,
  initialIsOpen = false,
  showHandle,
  direction = "right",
  ...props
}) => {
  return (
    <>
      <ShadcnDrawer direction={direction} {...props}>
        <DrawerTrigger>
          {TriggerButton ?? (
            <Button className={clsx(triggerClassName)}>Open</Button>
          )}
        </DrawerTrigger>

        <DrawerContent
          showHandle={showHandle}
          className={clsx(["dark", contentClassName])}
        >
          <DrawerTrigger
            className={clsx([
              "absolute",
              "top-1/2",
              "-translate-y-1/2",
              direction === "right" ? "-left-12" : "-right-12",
              "bg-blue-500",
              "text-white",
              "p-2",
              "rounded",
              "z-50",
              triggerClassName,
            ])}
          >
            Close
          </DrawerTrigger>
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
