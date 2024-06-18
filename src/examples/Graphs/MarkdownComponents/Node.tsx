interface NodeProps {
  name: string;
}

export function Node({ name }: NodeProps) {
  return (
    <span
      className="items-center flex h-8 w-8 justify-center rounded-full
        bg-indigo-600 leading-none my-2"
    >
      {name}
    </span>
  );
}
