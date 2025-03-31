import * as React from "react";
import { ButtonProps, Button as ShadcnButton } from "./shadcn/button";
import { withTooltip } from "./withTooltip";

export const Button: React.FC<ButtonProps & { tooltip?: string }> = withTooltip(
  ({ variant = "default", size = "sm", children, onClick, ...props }) => {
    return (
      <ShadcnButton variant={variant} size={size} onClick={onClick} {...props}>
        {children}
      </ShadcnButton>
    );
  },
);

export type { ButtonProps } from "./shadcn/button";
