import clsx from "clsx";

interface GraphKeyProps {
  keyTable: Array<{ color: string; description: string }>;
  className?: string;
  drawerTriggerButton?: React.ReactNode;
  collapsibleTitle?: string | React.ReactNode;
  initialOpen?: boolean;
}

export const GraphKey: React.FC<GraphKeyProps> = ({ keyTable, className }) => {
  return (
    <>
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
    </>
  );
};
