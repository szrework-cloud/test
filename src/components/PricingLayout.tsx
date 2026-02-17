import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"

interface PricingLayoutProps {
  children: React.ReactNode
}

export default async function PricingLayout({ children }: PricingLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="grain min-h-screen bg-[#080808]">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-primary/[0.03] blur-[150px]" />
        <div className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-emerald-800/[0.04] blur-[130px]" />
      </div>
      <main className="relative z-10 flex min-h-screen items-center justify-center p-5 md:p-8">
        {children}
      </main>
    </div>
  )
}
