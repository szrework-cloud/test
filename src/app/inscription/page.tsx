"use client"

import { useActionState } from "react"
import { register } from "@/actions/auth"
import Link from "next/link"

export default function InscriptionPage() {
  const [state, formAction, isPending] = useActionState(register, null)

  const inputClass =
    "input-glow w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-bright placeholder:text-text-muted/40 transition-all focus:outline-none"

  return (
    <div className="grain relative flex min-h-screen items-center justify-center bg-[#080808] px-4">
      {/* Ambient orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-primary/[0.06] blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 h-56 w-56 rounded-full bg-emerald-700/[0.05] blur-[120px]" />
      </div>

      <div className="relative w-full max-w-sm animate-in stagger-1">
        {/* Logo */}
        <div className="mb-10 text-center">
          <div className="pulse-glow mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-emerald-700">
            <span className="font-display text-xl font-bold text-white">S</span>
          </div>
          <h1 className="glow-text font-display text-3xl font-bold tracking-tight text-primary">
            SoloCRM
          </h1>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-text-muted">
            Creez votre compte
          </p>
        </div>

        {/* Form card */}
        <div className="card-glow animate-in stagger-2 p-6">
          <h2 className="mb-6 font-display text-lg font-semibold tracking-tight text-text-bright">
            Inscription
          </h2>

          <form action={formAction} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="prenom" className="mb-1.5 block font-mono text-[10px] font-medium uppercase tracking-wider text-text-muted">
                  Prenom
                </label>
                <input
                  id="prenom"
                  name="prenom"
                  type="text"
                  required
                  placeholder="Jean"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="nom" className="mb-1.5 block font-mono text-[10px] font-medium uppercase tracking-wider text-text-muted">
                  Nom
                </label>
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  required
                  placeholder="Dupont"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block font-mono text-[10px] font-medium uppercase tracking-wider text-text-muted">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="vous@exemple.com"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block font-mono text-[10px] font-medium uppercase tracking-wider text-text-muted">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                placeholder="6 caracteres minimum"
                className={inputClass}
              />
            </div>

            {state?.error && (
              <p className="font-mono text-xs text-danger">{state.error}</p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="btn-primary mt-2 w-full text-center disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isPending ? "Creation..." : "Creer mon compte"}
            </button>
          </form>

          <p className="mt-5 text-center font-mono text-[11px] text-text-muted">
            Deja un compte ?{" "}
            <Link
              href="/login"
              className="font-medium text-primary transition-colors hover:text-primary-light"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
