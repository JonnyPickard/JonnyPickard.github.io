import clsx from "clsx";
import React from "react";
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
  ...props
}) => {
  return (
    <ShadcnDrawer defaultOpen={initialIsOpen} {...props}>
      <DrawerTrigger>
        {TriggerButton ?? (
          <Button className={clsx(triggerClassName)}>Open</Button>
        )}
      </DrawerTrigger>

      <DrawerContent
        showHandle={showHandle}
        className={clsx(["dark", contentClassName])}
      >
        {children}
      </DrawerContent>
    </ShadcnDrawer>
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
