import clsx from "clsx";

interface GraphKeyProps {
  keyTable: {
    color: string;
    description: string;
  }[];
}

export const GraphKey = ({ keyTable }: GraphKeyProps) => {
  return (
    <table
      className={clsx(
        "text-white",
        "absolute",
        "top-0",
        "right-0",
        "border-separate",
        "border-spacing-2",
        "bg-slate-900",
      )}
    >
      <tbody>
        {keyTable?.map(({ color, description }, i) => (
          <tr key={`keyTable-${i}`}>
            <td className={clsx(color, "p-4")} />
            <td>{description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
