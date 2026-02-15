"use server"

import bcrypt from "bcryptjs"
import { prisma } from "@/lib/db"
import { createSession, destroySession } from "@/lib/auth"
import { LoginSchema, RegisterSchema } from "@/lib/validations/auth"
import { redirect } from "next/navigation"

export async function login(
  _prev: { error: string } | null,
  formData: FormData,
): Promise<{ error: string }> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const parsed = LoginSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: "Email ou mot de passe invalide" }
  }

  const { email, password } = parsed.data

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return { error: "Email ou mot de passe incorrect" }
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return { error: "Email ou mot de passe incorrect" }
  }

  await createSession(user.id)
  redirect("/")
}

export async function register(
  _prev: { error: string } | null,
  formData: FormData,
): Promise<{ error: string }> {
  const raw = {
    prenom: formData.get("prenom"),
    nom: formData.get("nom"),
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const parsed = RegisterSchema.safeParse(raw)
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Donnees invalides"
    return { error: firstError }
  }

  const { prenom, nom, email, password } = parsed.data

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return { error: "Un compte avec cet email existe deja" }
  }

  const hashed = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: { prenom, nom, email, password: hashed },
  })

  await createSession(user.id)
  redirect("/")
}

export async function logout(): Promise<void> {
  await destroySession()
  redirect("/login")
}
