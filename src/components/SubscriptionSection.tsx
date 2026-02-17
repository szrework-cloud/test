"use client"

import { useEffect, useState, useTransition } from "react"
import { getSubscriptionStatus, createPortalSession } from "@/actions/subscription"

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  active: { label: "Actif", color: "text-primary" },
  trialing: { label: "Essai gratuit", color: "text-blue-400" },
  past_due: { label: "Paiement en retard", color: "text-yellow-400" },
  canceled: { label: "Annule", color: "text-red-400" },
  none: { label: "Aucun", color: "text-text-muted" },
}

export default function SubscriptionSection() {
  const [status, setStatus] = useState<string>("none")
  const [renewsAt, setRenewsAt] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    getSubscriptionStatus().then((result) => {
      if ("error" in result) return
      setStatus(result.status)
      setRenewsAt(result.renewsAt)
    })
  }, [])

  function handleManage() {
    startTransition(async () => {
      const result = await createPortalSession()
      if ("error" in result) {
        console.error(result.error)
      }
    })
  }

  const statusInfo = STATUS_LABELS[status] ?? STATUS_LABELS.none

  return (
    <div className="card-glow rounded-2xl border border-border bg-surface-light p-6">
      <h3 className="font-display text-lg font-semibold text-text-bright">Abonnement</h3>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-muted">Statut</span>
          <span className={`font-mono text-sm font-semibold ${statusInfo.color}`}>
            {statusInfo.label}
          </span>
        </div>

        {renewsAt && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-muted">Prochain renouvellement</span>
            <span className="font-mono text-sm text-text-bright">
              {new Date(renewsAt).toLocaleDateString("fr-FR")}
            </span>
          </div>
        )}
      </div>

      {status !== "none" && (
        <button
          onClick={handleManage}
          disabled={isPending}
          className="btn-primary mt-6 w-full rounded-xl py-2.5 font-display text-sm font-semibold transition-all duration-300 disabled:opacity-50"
        >
          {isPending ? "Redirection..." : "Gerer mon abonnement"}
        </button>
      )}
    </div>
  )
}
