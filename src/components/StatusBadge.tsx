import { ContactStatus } from "@/lib/types";

const statusConfig: Record<ContactStatus, { label: string; dotColor: string; className: string }> = {
  prospect: {
    label: "Prospect",
    dotColor: "bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.5)]",
    className: "text-blue-400 ring-blue-500/20",
  },
  client: {
    label: "Client",
    dotColor: "bg-primary shadow-[0_0_6px_rgba(34,197,94,0.5)]",
    className: "text-primary ring-primary/20",
  },
  perdu: {
    label: "Perdu",
    dotColor: "bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.5)]",
    className: "text-red-400 ring-red-500/20",
  },
};

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status as ContactStatus] ?? statusConfig.prospect;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-surface-lighter px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider ring-1 ${config.className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dotColor}`} />
      {config.label}
    </span>
  );
}
