"use client"

import { useRouter } from "next/navigation"
import { FormEvent, useState, useTransition } from "react"
import { createContact } from "@/actions/contacts"

export default function NewContactForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    entreprise: "",
    statut: "prospect" as "prospect" | "client" | "perdu",
  })

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError("")

    startTransition(async () => {
      const result = await createContact(form)

      if (result.success) {
        router.push("/contacts")
      } else {
        setError(result.error)
      }
    })
  }

  const inputClass =
    "input-glow w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-bright placeholder:text-text-muted/40 transition-all focus:outline-none"

  return (
    <form onSubmit={handleSubmit} className="card-glow animate-in stagger-2 p-6">
      <div className="flex flex-col gap-5">
        {/* Prenom / Nom */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="prenom" className="mb-1.5 block font-mono text-[10px] font-medium uppercase tracking-wider text-text-muted">
              Prenom
            </label>
            <input
              id="prenom"
              type="text"
              value={form.prenom}
              onChange={(e) => updateField("prenom", e.target.value)}
              placeholder="Jean"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="nom" className="mb-1.5 block font-mono text-[10px] font-medium uppercase tracking-wider text-text-muted">
              Nom
            </label>
            <input
              id="nom"
              type="text"
              value={form.nom}
              onChange={(e) => updateField("nom", e.target.value)}
              placeholder="Dupont"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-1.5 block font-mono text-[10px] font-medium uppercase tracking-wider text-text-muted">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="jean.dupont@exemple.com"
            required
            className={inputClass}
          />
        </div>

        {/* Telephone */}
        <div>
          <label htmlFor="telephone" className="mb-1.5 block font-mono text-[10px] font-medium uppercase tracking-wider text-text-muted">
            Telephone
          </label>
          <input
            id="telephone"
            type="tel"
            value={form.telephone}
            onChange={(e) => updateField("telephone", e.target.value)}
            placeholder="06 12 34 56 78"
            className={inputClass}
          />
        </div>

        {/* Entreprise */}
        <div>
          <label htmlFor="entreprise" className="mb-1.5 block font-mono text-[10px] font-medium uppercase tracking-wider text-text-muted">
            Entreprise
          </label>
          <input
            id="entreprise"
            type="text"
            value={form.entreprise}
            onChange={(e) => updateField("entreprise", e.target.value)}
            placeholder="Nom de l'entreprise"
            className={inputClass}
          />
        </div>

        {/* Statut */}
        <div>
          <label htmlFor="statut" className="mb-1.5 block font-mono text-[10px] font-medium uppercase tracking-wider text-text-muted">
            Statut
          </label>
          <select
            id="statut"
            value={form.statut}
            onChange={(e) => updateField("statut", e.target.value)}
            className="input-glow w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-bright transition-all focus:outline-none"
          >
            <option value="prospect">Prospect</option>
            <option value="client">Client</option>
            <option value="perdu">Perdu</option>
          </select>
        </div>
      </div>

      {error && (
        <p className="mt-4 font-mono text-xs text-danger">{error}</p>
      )}

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/contacts")}
          disabled={isPending}
          className="rounded-xl border border-border px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-wider text-text-bright transition-all hover:border-primary/30 hover:bg-surface-lighter disabled:opacity-40"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isPending ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>
    </form>
  )
}
