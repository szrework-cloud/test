import { z } from "zod"

const statuts = ["prospect", "client", "perdu"] as const

export const CreateContactSchema = z.object({
  prenom: z.string().min(1, "Le prenom est requis").max(100),
  nom: z.string().min(1, "Le nom est requis").max(100),
  email: z.string().email("Email invalide"),
  telephone: z.string().max(20).default(""),
  entreprise: z.string().max(200).default(""),
  statut: z.enum(statuts).default("prospect"),
})

export const UpdateContactSchema = z.object({
  prenom: z.string().min(1).max(100).optional(),
  nom: z.string().min(1).max(100).optional(),
  email: z.string().email("Email invalide").optional(),
  telephone: z.string().max(20).optional(),
  entreprise: z.string().max(200).optional(),
  statut: z.enum(statuts).optional(),
})

export const ContactIdSchema = z.string().min(1, "ID requis")

export const SearchQuerySchema = z.string().max(200).default("")

export type CreateContactInput = z.infer<typeof CreateContactSchema>
export type UpdateContactInput = z.infer<typeof UpdateContactSchema>
