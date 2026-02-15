interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  delay?: number;
}

export default function StatCard({ label, value, icon, delay = 0 }: StatCardProps) {
  return (
    <div
      className={`card-glow group animate-in stagger-${delay + 1} p-5 transition-all duration-300`}
    >
      {/* Background orb */}
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/[0.03] blur-2xl transition-all duration-500 group-hover:bg-primary/[0.08]" />

      <div className="relative flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/[0.08] text-primary ring-1 ring-primary/10 transition-all duration-300 group-hover:bg-primary/[0.12] group-hover:ring-primary/20">
          {icon}
        </div>
        <div>
          <p className="font-mono text-2xl font-bold tracking-tight text-text-bright">
            {value}
          </p>
          <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
