"use client"

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const GLOW_GREEN = "rgba(34, 197, 94, 0.15)"

function ChartCard({
  title,
  subtitle,
  children,
  delay = 0,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  delay?: number
}) {
  return (
    <div className={`card-glow animate-in stagger-${delay + 3} p-5`}>
      <div className="mb-4">
        <h3 className="font-display text-sm font-semibold tracking-tight text-text-bright">{title}</h3>
        {subtitle && (
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-text-muted">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  )
}

function KpiCard({
  label,
  value,
  suffix,
  color,
  delay = 0,
}: {
  label: string
  value: number
  suffix?: string
  color: string
  delay?: number
}) {
  return (
    <div className={`card-glow animate-in stagger-${delay + 1} group p-5 transition-all duration-300`}>
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full blur-2xl transition-all duration-500 group-hover:opacity-80" style={{ background: `${color}10` }} />
      <p className="relative font-mono text-[10px] font-medium uppercase tracking-wider text-text-muted">{label}</p>
      <p className="relative mt-1 font-mono text-3xl font-bold tracking-tight" style={{ color }}>
        {value}
        {suffix && <span className="ml-0.5 text-lg">{suffix}</span>}
      </p>
    </div>
  )
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-border bg-surface-card px-3 py-2 shadow-2xl shadow-black/40">
      {label && <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">{label}</p>}
      {payload.map((entry) => (
        <p key={entry.name} className="font-mono text-[11px]" style={{ color: entry.color }}>
          {entry.name}: <span className="font-bold">{entry.value}</span>
        </p>
      ))}
    </div>
  )
}

interface AnalyticsChartsProps {
  statusData: Array<{ name: string; value: number; fill: string }>
  conversionFunnel: Array<{ etape: string; valeur: number; fill: string }>
  weeklyActivity: Array<{ jour: string; notes: number; contacts: number }>
  conversionRate: number
  prospectCount: number
  clientCount: number
  perteRate: number
}

export default function AnalyticsCharts({
  statusData,
  conversionFunnel,
  weeklyActivity,
  conversionRate,
  prospectCount,
  clientCount,
  perteRate,
}: AnalyticsChartsProps) {
  return (
    <>
      <div className="animate-in stagger-1 mb-8">
        <h2 className="font-display text-2xl font-bold tracking-tight text-text-bright">Analytics</h2>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-text-muted">
          Suivi des performances et taux de conversion
        </p>
      </div>

      {/* KPI cards row */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Taux de conversion" value={conversionRate} suffix="%" color="#22C55E" delay={0} />
        <KpiCard label="Prospects actifs" value={prospectCount} color="#3B82F6" delay={1} />
        <KpiCard label="Clients acquis" value={clientCount} color="#22C55E" delay={2} />
        <KpiCard label="Taux de perte" value={perteRate} suffix="%" color="#EF4444" delay={3} />
      </div>

      {/* Charts grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Donut — Status distribution */}
        <ChartCard title="Repartition des contacts" subtitle="Par statut actuel" delay={0}>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {statusData.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={entry.fill}
                      style={{ filter: `drop-shadow(0 0 8px ${entry.fill}40)` }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  iconSize={8}
                  formatter={(value: string) => (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Funnel — Conversion pipeline */}
        <ChartCard title="Pipeline de conversion" subtitle="De premier contact a client" delay={1}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={conversionFunnel}
              layout="vertical"
              margin={{ left: 10, right: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1E1E22" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#5C6370", fontSize: 10, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
              <YAxis
                type="category"
                dataKey="etape"
                tick={{ fill: "#5C6370", fontSize: 10, fontFamily: "var(--font-mono)" }}
                axisLine={false}
                tickLine={false}
                width={130}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: GLOW_GREEN }} />
              <Bar dataKey="valeur" name="Contacts" radius={[0, 6, 6, 0]}>
                {conversionFunnel.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.fill}
                    style={{ filter: `drop-shadow(0 0 6px ${entry.fill}30)` }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Bar — Weekly activity */}
        <ChartCard title="Activite de la semaine" subtitle="Notes et nouveaux contacts" delay={2}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={weeklyActivity} margin={{ left: -10, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E1E22" />
              <XAxis dataKey="jour" tick={{ fill: "#5C6370", fontSize: 10, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#5C6370", fontSize: 10, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: GLOW_GREEN }} />
              <Legend
                verticalAlign="top"
                iconType="circle"
                iconSize={8}
                formatter={(value: string) => (
                  <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">{value}</span>
                )}
              />
              <Bar
                dataKey="notes"
                name="Notes"
                fill="#22C55E"
                radius={[4, 4, 0, 0]}
                style={{ filter: "drop-shadow(0 0 6px rgba(34,197,94,0.3))" }}
              />
              <Bar
                dataKey="contacts"
                name="Contacts"
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
                style={{ filter: "drop-shadow(0 0 6px rgba(59,130,246,0.3))" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </>
  )
}
