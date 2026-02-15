"use server"

import { prisma } from "@/lib/db"
import {
  CreateContactSchema,
  UpdateContactSchema,
  ContactIdSchema,
  type CreateContactInput,
  type UpdateContactInput,
} from "@/lib/validations/contact"

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string }

export async function getContacts(): Promise<ActionResult<Awaited<ReturnType<typeof prisma.contact.findMany>>>> {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { dateAjout: "desc" },
    })
    return { success: true, data: contacts }
  } catch (error) {
    return { success: false, error: "Impossible de charger les contacts" }
  }
}

export async function getContactById(id: string): Promise<ActionResult<Awaited<ReturnType<typeof prisma.contact.findUnique>>>> {
  try {
    const parsed = ContactIdSchema.safeParse(id)
    if (!parsed.success) {
      return { success: false, error: "ID invalide" }
    }

    const contact = await prisma.contact.findUnique({
      where: { id: parsed.data },
    })

    if (!contact) {
      return { success: false, error: "Contact introuvable" }
    }

    return { success: true, data: contact }
  } catch (error) {
    return { success: false, error: "Impossible de charger le contact" }
  }
}

export async function getRecentContacts(count: number = 5): Promise<ActionResult<Awaited<ReturnType<typeof prisma.contact.findMany>>>> {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { dateAjout: "desc" },
      take: count,
    })
    return { success: true, data: contacts }
  } catch (error) {
    return { success: false, error: "Impossible de charger les contacts recents" }
  }
}

export async function createContact(data: CreateContactInput): Promise<ActionResult<Awaited<ReturnType<typeof prisma.contact.create>>>> {
  try {
    const parsed = CreateContactSchema.safeParse(data)
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Donnees invalides"
      return { success: false, error: firstError }
    }

    const existing = await prisma.contact.findUnique({
      where: { email: parsed.data.email },
    })
    if (existing) {
      return { success: false, error: "Un contact avec cet email existe deja" }
    }

    const contact = await prisma.contact.create({
      data: {
        prenom: parsed.data.prenom,
        nom: parsed.data.nom,
        email: parsed.data.email,
        telephone: parsed.data.telephone,
        entreprise: parsed.data.entreprise,
        statut: parsed.data.statut,
      },
    })

    return { success: true, data: contact }
  } catch (error) {
    return { success: false, error: "Impossible de creer le contact" }
  }
}

export async function updateContact(id: string, data: UpdateContactInput): Promise<ActionResult<Awaited<ReturnType<typeof prisma.contact.update>>>> {
  try {
    const parsedId = ContactIdSchema.safeParse(id)
    if (!parsedId.success) {
      return { success: false, error: "ID invalide" }
    }

    const parsed = UpdateContactSchema.safeParse(data)
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Donnees invalides"
      return { success: false, error: firstError }
    }

    const existing = await prisma.contact.findUnique({
      where: { id: parsedId.data },
    })
    if (!existing) {
      return { success: false, error: "Contact introuvable" }
    }

    if (parsed.data.email && parsed.data.email !== existing.email) {
      const emailTaken = await prisma.contact.findUnique({
        where: { email: parsed.data.email },
      })
      if (emailTaken) {
        return { success: false, error: "Un contact avec cet email existe deja" }
      }
    }

    const contact = await prisma.contact.update({
      where: { id: parsedId.data },
      data: parsed.data,
    })

    return { success: true, data: contact }
  } catch (error) {
    return { success: false, error: "Impossible de mettre a jour le contact" }
  }
}

export async function deleteContact(id: string): Promise<ActionResult<{ id: string }>> {
  try {
    const parsed = ContactIdSchema.safeParse(id)
    if (!parsed.success) {
      return { success: false, error: "ID invalide" }
    }

    const existing = await prisma.contact.findUnique({
      where: { id: parsed.data },
    })
    if (!existing) {
      return { success: false, error: "Contact introuvable" }
    }

    await prisma.contact.delete({
      where: { id: parsed.data },
    })

    return { success: true, data: { id: parsed.data } }
  } catch (error) {
    return { success: false, error: "Impossible de supprimer le contact" }
  }
}
