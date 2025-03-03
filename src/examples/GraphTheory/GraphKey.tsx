import clsx from "clsx";

interface GraphKeyProps {
  keyTable: {
    color: string;
    description: string;
  }[];
  className?: React.HTMLAttributes<HTMLTableElement>["className"];
}

export const GraphKey = ({ keyTable, className }: GraphKeyProps) => {
  return (
    <table
      className={clsx(
        "text-white",
        "border-separate",
        "border-spacing-2",
        "bg-secondary-500/40",
        "rounded-md",
        "p-2",
        className,
      )}
    >
      <tbody>
        {keyTable?.map(({ color, description }, i) => (
          <tr key={`keyTable-${i}`}>
            <td className={clsx([color, "p-4", "w-4", "h-4"])} />
            <td>{description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
