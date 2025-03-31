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
} from "./shadcn/drawer";

interface DrawerProps {
  children: React.ReactNode;
  triggerClassName?: string;
  contentClassName?: string;
  TriggerButton?: React.ReactNode;
  initialIsOpen?: boolean;
}

export const Drawer: React.FC<DrawerProps> = ({
  children,
  triggerClassName,
  contentClassName,
  TriggerButton,
  initialIsOpen = false,
}) => {
  return (
    <ShadcnDrawer defaultOpen={initialIsOpen}>
      <DrawerTrigger>
        {TriggerButton ?? (
          <Button className={clsx(triggerClassName)}>Open</Button>
        )}
      </DrawerTrigger>

      <DrawerContent className={clsx(["dark", contentClassName])}>
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
