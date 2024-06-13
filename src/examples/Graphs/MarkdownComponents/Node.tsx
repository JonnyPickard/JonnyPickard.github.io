interface NodeProps {
  name: string;
}

export function Node({ name }: NodeProps) {
  return (
    <span
      className="align-center flex h-12 w-12 justify-center rounded-full
        bg-indigo-600 p-4 leading-none"
    >
      {name}
    </span>
  );
}
