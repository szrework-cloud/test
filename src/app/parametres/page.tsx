import AuthLayout from "@/components/AuthLayout"

export default function ParametresPage() {
  return (
    <AuthLayout>
      <div className="animate-in stagger-1 mb-8">
        <h2 className="font-display text-2xl font-bold tracking-tight text-text-bright">Parametres</h2>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-text-muted">
          Configuration de votre espace
        </p>
      </div>

      <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center">
        <div className="animate-in stagger-3 text-center">
          <button className="group relative rounded-2xl bg-gradient-to-br from-red-600 to-red-500 px-8 py-4 font-display text-sm font-semibold text-white shadow-xl shadow-red-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/30 hover:-translate-y-0.5">
            <div className="absolute -inset-1 rounded-2xl bg-red-500/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative">Bouton rouge</span>
          </button>
        </div>
      </div>
    </AuthLayout>
  )
}
