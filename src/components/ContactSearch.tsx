"use client"

import { useState } from "react"
import Link from "next/link"
import ContactTable from "./ContactTable"
import type { Contact } from "@/generated/prisma/client"

interface ContactSearchProps {
  initialContacts: Contact[]
}

export default function ContactSearch({ initialContacts }: ContactSearchProps) {
  const [search, setSearch] = useState("")

  const filtered = initialContacts.filter((c) => {
    const q = search.toLowerCase()
    return (
      c.prenom.toLowerCase().includes(q) ||
      c.nom.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.entreprise.toLowerCase().includes(q)
    )
  })

  return (
    <>
      <div className="animate-in stagger-1 mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-text-bright">
            Contacts
          </h2>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-text-muted">
            {initialContacts.length} contacts au total
          </p>
        </div>

        <Link href="/contacts/new" className="btn-primary inline-flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Ajouter un contact
        </Link>
      </div>

      <div className="animate-in stagger-2 mb-6">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un contact..."
            className="input-glow w-full rounded-xl border border-border bg-surface-card py-2.5 pl-11 pr-4 text-sm text-text-bright placeholder:text-text-muted/40 transition-all focus:outline-none"
          />
        </div>
      </div>

      <div className="animate-in stagger-3">
        {filtered.length > 0 ? (
          <ContactTable contacts={filtered} />
        ) : (
          <div className="card-glow py-12 text-center">
            <p className="font-mono text-xs text-text-muted">
              Aucun contact trouve pour &quot;{search}&quot;
            </p>
          </div>
        )}
      </div>
    </>
  )
}
