import AuthLayout from "@/components/AuthLayout"
import { getStats, getStatusDistribution } from "@/actions/stats"
import { conversionFunnel, weeklyActivity } from "@/lib/mock-data"
import AnalyticsCharts from "./AnalyticsCharts"

export default async function AnalyticsPage() {
  const [statsResult, statusResult] = await Promise.all([
    getStats(),
    getStatusDistribution(),
  ])

  const stats = statsResult.success ? statsResult.data : { totalContacts: 0, contactsCeMois: 0, notesCetteSemaine: 0 }
  const statusData = statusResult.success ? statusResult.data : []

  const totalContacts = stats.totalContacts
  const clientCount = statusData.find((s) => s.name === "Clients")?.value ?? 0
  const prospectCount = statusData.find((s) => s.name === "Prospects")?.value ?? 0
  const perduCount = statusData.find((s) => s.name === "Perdus")?.value ?? 0
  const conversionRate = totalContacts > 0 ? Math.round((clientCount / totalContacts) * 100) : 0
  const perteRate = totalContacts > 0 ? Math.round((perduCount / totalContacts) * 100) : 0

  return (
    <AuthLayout>
      <AnalyticsCharts
        statusData={statusData}
        conversionFunnel={conversionFunnel}
        weeklyActivity={weeklyActivity}
        conversionRate={conversionRate}
        prospectCount={prospectCount}
        clientCount={clientCount}
        perteRate={perteRate}
      />
    </AuthLayout>
  )
}
