export interface GraphsProps {
  prop?: string;
}

export function Graphs({ prop = "default value" }: GraphsProps) {
  return <div className="bg-slate-600">Graphs {prop}</div>;
}
