import { Copy } from "lucide-react";

const ColourWrapper = ({
  label,
  value,
  onClick,
}: {
  label: string;
  value: string;
  onClick: () => void;
}) => (
  <button
    className="flex bg-background px-3 py-1 rounded-lg items-center gap-3 min-w-48 font-mono"
    onClick={onClick}
    type="button"
  >
    <Copy size={16} className="text-muted-foreground" />
    <div className="flex flex-col">
      <p className="uppercase text-xxs text-muted-foreground text-left">
        {label}
      </p>
      <p className="text-foreground text-sm font-bold">{value}</p>
    </div>
  </button>
);

export default ColourWrapper;
