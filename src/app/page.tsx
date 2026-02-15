import AuthLayout from "@/components/AuthLayout"
import StatCard from "@/components/StatCard"
import ContactTable from "@/components/ContactTable"
import { getStats } from "@/actions/stats"
import { getRecentContacts } from "@/actions/contacts"

export default async function DashboardPage() {
  const [statsResult, recentResult] = await Promise.all([
    getStats(),
    getRecentContacts(5),
  ])

  const stats = statsResult.success ? statsResult.data : { totalContacts: 0, contactsCeMois: 0, notesCetteSemaine: 0 }
  const recentContacts = recentResult.success ? recentResult.data : []

  return (
    <AuthLayout>
      <div className="animate-in stagger-1 mb-8">
        <h2 className="font-display text-2xl font-bold tracking-tight text-text-bright">
          Dashboard
        </h2>
        <p className="mt-1 font-mono text-xs uppercase tracking-wider text-text-muted">
          Vue d&apos;ensemble de votre activite
        </p>
      </div>

      {/* Stat cards */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Total contacts"
          value={stats.totalContacts}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          }
        />
        <StatCard
          label="Ajoutes ce mois"
          value={stats.contactsCeMois}
          delay={1}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
          }
        />
        <StatCard
          label="Notes cette semaine"
          value={stats.notesCetteSemaine}
          delay={2}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          }
        />
      </div>

      {/* Recent contacts */}
      <div className="animate-in stagger-5">
        <h3 className="mb-4 font-display text-lg font-semibold tracking-tight text-text-bright">
          Derniers contacts ajoutes
        </h3>
        <ContactTable contacts={recentContacts} showEntreprise={false} showDernierContact={false} showRelance />
      </div>
    </AuthLayout>
  )
}
