import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
})

export const RegisterSchema = z.object({
  prenom: z.string().min(1, "Prenom requis"),
  nom: z.string().min(1, "Nom requis"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "6 caracteres minimum"),
})
