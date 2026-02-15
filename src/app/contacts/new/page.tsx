import AuthLayout from "@/components/AuthLayout"
import NewContactForm from "./NewContactForm"
import Link from "next/link"

export default function NewContactPage() {
  return (
    <AuthLayout>
      {/* Back link */}
      <Link
        href="/contacts"
        className="animate-in stagger-1 mb-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-text-muted transition-colors hover:text-primary"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Retour aux contacts
      </Link>

      <div className="mx-auto max-w-lg">
        <h2 className="animate-in stagger-1 mb-6 font-display text-2xl font-bold tracking-tight text-text-bright">
          Nouveau contact
        </h2>

        <NewContactForm />
      </div>
    </AuthLayout>
  )
}
