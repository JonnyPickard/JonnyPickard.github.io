import * as React from "react";
import { ButtonProps, Button as ShadcnButton } from "./shadcn/button";

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "sm",
  children,
  onClick,
  ...props
}) => {
  return (
    <ShadcnButton variant={variant} size={size} onClick={onClick} {...props}>
      {children}
    </ShadcnButton>
  );
};

export type { ButtonProps } from "./shadcn/button";

export default Button;
