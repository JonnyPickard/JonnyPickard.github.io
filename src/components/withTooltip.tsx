import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";
import clsx from "clsx";
import React from "react";

/**
 * A higher-order component (HOC) that wraps a given component and adds tooltip functionality.
 *
 * @template T - The props type of the wrapped component.
 * @param WrappedComponent - The React component to be wrapped with tooltip functionality.
 * @returns A new component that renders the wrapped component with an optional tooltip.
 *
 * The returned component accepts all the props of the wrapped component, along with an additional
 * `tooltip` prop. If the `tooltip` prop is provided, the wrapped component will be displayed
 * inside a tooltip trigger, and the tooltip content will be displayed when triggered.
 *
 * Example usage:
 * ```tsx
 * const ButtonWithTooltip = withTooltip(Button);
 *
 * <ButtonWithTooltip tooltip="Click me!">Click</ButtonWithTooltip>
 * ```
 */
export function withTooltip<T extends object>(
  WrappedComponent: React.ComponentType<T>,
) {
  return ({
    tooltip,
    tooltipClassName,
    ...props
  }: T & { tooltip?: string; tooltipClassName?: string }) => {
    if (tooltip) {
      return (
        <Tooltip>
          <TooltipTrigger>
            <WrappedComponent {...(props as T)} />
          </TooltipTrigger>
          <TooltipContent className={clsx(tooltipClassName)}>
            {tooltip}
          </TooltipContent>
        </Tooltip>
      );
    }
    return <WrappedComponent {...(props as T)} />;
  };
}
