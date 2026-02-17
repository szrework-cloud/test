"use client"

import { useTransition } from "react"
import { createCheckoutSession } from "@/actions/subscription"

const FEATURES = [
  "Contacts illimites",
  "Suivi des prospects",
  "Tableau de bord analytique",
  "Notes et historique",
  "Export des donnees",
]

export default function PricingCard() {
  const [isPending, startTransition] = useTransition()

  function handleSubscribe() {
    startTransition(async () => {
      const result = await createCheckoutSession()
      if ("error" in result) {
        console.error(result.error)
      }
    })
  }

  return (
    <div className="animate-in stagger-2 w-full max-w-md">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight text-text-bright">
          SoloCRM Pro
        </h1>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-text-muted">
          Tout ce dont vous avez besoin pour gerer vos clients
        </p>
      </div>

      <div className="card-glow rounded-2xl border border-border bg-surface-light p-8">
        <div className="mb-6 text-center">
          <span className="font-display text-5xl font-bold text-text-bright">19</span>
          <span className="ml-1 font-display text-xl text-text-muted">&euro;/mois</span>
        </div>

        <ul className="mb-8 space-y-3">
          {FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-sm text-text-bright/80">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                &#10003;
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <button
          onClick={handleSubscribe}
          disabled={isPending}
          className="btn-primary w-full rounded-xl py-3 font-display text-sm font-semibold transition-all duration-300 disabled:opacity-50"
        >
          {isPending ? "Redirection..." : "S'abonner"}
        </button>
      </div>
    </div>
  )
}
