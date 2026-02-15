"use client"

import Link from "next/link"
import type { Contact } from "@/generated/prisma/client"
import StatusBadge from "./StatusBadge"

interface ContactTableProps {
  contacts: Contact[]
  showEntreprise?: boolean
  showDernierContact?: boolean
  showRelance?: boolean
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default function ContactTable({
  contacts,
  showEntreprise = true,
  showDernierContact = true,
  showRelance = false,
}: ContactTableProps) {
  return (
    <div className="card-glow animate-in stagger-3 overflow-x-auto">
      <table className="w-full text-left text-[13px]">
        <thead>
          <tr className="border-b border-border">
            <th className="px-5 py-3.5 font-mono text-[10px] font-medium uppercase tracking-wider text-text-muted">Nom</th>
            <th className="hidden px-5 py-3.5 font-mono text-[10px] font-medium uppercase tracking-wider text-text-muted sm:table-cell">Email</th>
            {showEntreprise && (
              <th className="hidden px-5 py-3.5 font-mono text-[10px] font-medium uppercase tracking-wider text-text-muted md:table-cell">Entreprise</th>
            )}
            {showDernierContact && (
              <th className="hidden px-5 py-3.5 font-mono text-[10px] font-medium uppercase tracking-wider text-text-muted lg:table-cell">Dernier contact</th>
            )}
            <th className="px-5 py-3.5 font-mono text-[10px] font-medium uppercase tracking-wider text-text-muted">Statut</th>
            {showRelance && (
              <th className="px-5 py-3.5 text-right font-mono text-[10px] font-medium uppercase tracking-wider text-text-muted">Action</th>
            )}
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id} className="group border-b border-border/50 last:border-b-0 transition-colors duration-200 hover:bg-primary/[0.02]">
              <td className="px-5 py-3.5">
                <Link
                  href={`/contacts/${contact.id}`}
                  className="font-medium text-text-bright transition-colors duration-200 hover:text-primary"
                >
                  {contact.prenom} {contact.nom}
                </Link>
              </td>
              <td className="hidden px-5 py-3.5 font-mono text-xs text-text-muted sm:table-cell">{contact.email}</td>
              {showEntreprise && (
                <td className="hidden px-5 py-3.5 text-text-muted md:table-cell">{contact.entreprise}</td>
              )}
              {showDernierContact && (
                <td className="hidden px-5 py-3.5 font-mono text-xs text-text-muted lg:table-cell">
                  {formatDate(contact.dernierContact)}
                </td>
              )}
              <td className="px-5 py-3.5">
                <StatusBadge status={contact.statut} />
              </td>
              {showRelance && (
                <td className="px-5 py-3.5 text-right">
                  <a
                    href={`mailto:${contact.email}?subject=Prise de contact&body=Bonjour ${contact.prenom},%0D%0A%0D%0AJe me permets de revenir vers vous suite à notre dernier échange.%0D%0A%0D%0ACordialement`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/[0.06] px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-wider text-primary transition-all duration-200 hover:bg-primary/[0.12] hover:shadow-[0_0_12px_rgba(34,197,94,0.1)]"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    Relancer
                  </a>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
