import { Button } from "@/components";
import { Collapsible } from "@/components/Collapsible";
import { Drawer } from "@/components/Drawer";
import clsx from "clsx";

interface GraphKeyProps {
  keyTable: Array<{ color: string; description: string }>;
  className?: string;
  drawerTriggerButton?: React.ReactNode;
  collapsibleTitle?: string | React.ReactNode;
  initialOpen?: boolean;
}

export const GraphKey: React.FC<GraphKeyProps> = ({
  keyTable,
  className,
  collapsibleTitle = "Key",
  initialOpen = false,
}) => {
  return (
    <>
      {/* Mobile View: Drawer */}
      <div className="block md:hidden">
        <Drawer
          initialIsOpen={initialOpen}
          TriggerButton={<Button>{collapsibleTitle}</Button>}
        >
          <table
            className={clsx(
              "text-white",
              "border-separate",
              "border-spacing-2",
              "rounded-md",
              "p-2",
              className,
            )}
          >
            {keyTable.map((item, index) => (
              <tr key={index}>
                <td className={clsx([item.color, "p-4", "w-4", "h-4"])}></td>
                <td>{item.description}</td>
              </tr>
            ))}
          </table>
        </Drawer>
      </div>

      {/* Desktop View: Collapsible */}
      <div className="hidden md:block">
        <Collapsible Title={collapsibleTitle} initialOpen={initialOpen}>
          <table
            className={clsx(
              "text-white",
              "border-separate",
              "border-spacing-2",
              "rounded-md",
              "p-2",
              className,
            )}
          >
            {keyTable.map((item, index) => (
              <tr key={index}>
                <td className={clsx([item.color, "p-4", "w-4", "h-4"])}></td>
                <td>{item.description}</td>
              </tr>
            ))}
          </table>
        </Collapsible>
      </div>
    </>
  );
};
