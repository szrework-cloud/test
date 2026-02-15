import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import AppLayout from "./AppLayout"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const userInitials = `${user.prenom[0]}${user.nom[0]}`.toUpperCase()

  return <AppLayout userInitials={userInitials}>{children}</AppLayout>
}
