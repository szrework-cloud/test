import AuthLayout from "@/components/AuthLayout"
import SubscriptionSection from "@/components/SubscriptionSection"

export default function ParametresPage() {
  return (
    <AuthLayout>
      <div className="animate-in stagger-1 mb-8">
        <h2 className="font-display text-2xl font-bold tracking-tight text-text-bright">Parametres</h2>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-text-muted">
          Configuration de votre espace
        </p>
      </div>

      <div className="animate-in stagger-2 max-w-lg">
        <SubscriptionSection />
      </div>
    </AuthLayout>
  )
}
