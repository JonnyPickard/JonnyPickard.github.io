import { Icon } from "@iconify/react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import * as React from "react";

const RowSpacingIcon = () => (
  <Icon
    className="mr-2 text-xl text-white dark:text-slate-100"
    icon={"radix-icons:row-spacing"}
  />
);

const Cross2Icon = () => (
  <Icon
    className="mr-2 text-xl text-white dark:text-slate-100"
    icon={"radix-icons:cross-2"}
  />
);

type CollapsibleProps = {
  title: string;
  children: React.ReactNode;
};

export const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  children,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <CollapsiblePrimitive.Root
      className="CollapsibleRoot"
      open={open}
      onOpenChange={setOpen}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span className="Text" style={{ color: "white" }}>
          {title}
        </span>
        <CollapsiblePrimitive.Trigger asChild>
          <button className="IconButton">
            {open ? <Cross2Icon /> : <RowSpacingIcon />}
          </button>
        </CollapsiblePrimitive.Trigger>
      </div>

      <CollapsiblePrimitive.Content>{children}</CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  );
};
