import { redirect } from "next/navigation"
import AuthLayout from "@/components/AuthLayout"
import StatusBadge from "@/components/StatusBadge"
import NoteSection from "@/components/NoteSection"
import { getContactById, deleteContact } from "@/actions/contacts"
import { getNotesByContactId } from "@/actions/notes"
import Link from "next/link"

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default async function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [contactResult, notesResult] = await Promise.all([
    getContactById(id),
    getNotesByContactId(id),
  ])

  if (!contactResult.success || !contactResult.data) {
    return (
      <AuthLayout>
        <div className="py-12 text-center">
          <p className="font-display text-lg text-text-muted">Contact introuvable</p>
          <Link
            href="/contacts"
            className="mt-4 inline-block font-mono text-xs font-medium uppercase tracking-wider text-primary transition-colors hover:text-primary-light"
          >
            Retour aux contacts
          </Link>
        </div>
      </AuthLayout>
    )
  }

  const contact = contactResult.data
  const notes = notesResult.success ? notesResult.data : []

  async function handleDelete() {
    "use server"
    await deleteContact(id)
    redirect("/contacts")
  }

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

      {/* Contact header */}
      <div className="card-glow animate-in stagger-2 mb-8 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-display text-2xl font-bold tracking-tight text-text-bright">
                {contact.prenom} {contact.nom}
              </h2>
              <StatusBadge status={contact.statut} />
            </div>

            <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
              <div className="flex items-center gap-2.5 text-text-muted">
                <svg className="h-4 w-4 shrink-0 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="font-mono text-xs">{contact.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-text-muted">
                <svg className="h-4 w-4 shrink-0 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span className="font-mono text-xs">{contact.telephone}</span>
              </div>
              <div className="flex items-center gap-2.5 text-text-muted">
                <svg className="h-4 w-4 shrink-0 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
                </svg>
                <span>{contact.entreprise}</span>
              </div>
              <div className="flex items-center gap-2.5 text-text-muted">
                <svg className="h-4 w-4 shrink-0 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <span className="font-mono text-xs">Ajoute le {formatDate(contact.dateAjout)}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button className="rounded-xl border border-border px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-wider text-text-bright transition-all hover:border-primary/30 hover:bg-surface-lighter">
              Modifier
            </button>
            <form action={handleDelete}>
              <button
                type="submit"
                className="rounded-xl border border-danger/20 px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-wider text-danger transition-all hover:bg-danger/10"
              >
                Supprimer
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Notes section */}
      <NoteSection contactId={contact.id} initialNotes={notes} />
    </AuthLayout>
  )
}
