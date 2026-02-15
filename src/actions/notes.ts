"use server"

import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import {
  CreateNoteSchema,
  NoteIdSchema,
  type CreateNoteInput,
} from "@/lib/validations/note"

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string }

async function requireUser() {
  const user = await getCurrentUser()
  if (!user) throw new Error("Non authentifie")
  return user
}

export async function getNotesByContactId(contactId: string): Promise<ActionResult<Awaited<ReturnType<typeof prisma.note.findMany>>>> {
  try {
    const user = await requireUser()
    const contact = await prisma.contact.findFirst({
      where: { id: contactId, userId: user.id },
    })
    if (!contact) {
      return { success: false, error: "Contact introuvable" }
    }

    const notes = await prisma.note.findMany({
      where: { contactId },
      orderBy: { date: "desc" },
    })
    return { success: true, data: notes }
  } catch (error) {
    return { success: false, error: "Impossible de charger les notes" }
  }
}

export async function createNote(data: CreateNoteInput): Promise<ActionResult<Awaited<ReturnType<typeof prisma.note.create>>>> {
  try {
    const user = await requireUser()
    const parsed = CreateNoteSchema.safeParse(data)
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Donnees invalides"
      return { success: false, error: firstError }
    }

    const contact = await prisma.contact.findFirst({
      where: { id: parsed.data.contactId, userId: user.id },
    })
    if (!contact) {
      return { success: false, error: "Contact introuvable" }
    }

    const note = await prisma.note.create({
      data: {
        contactId: parsed.data.contactId,
        contenu: parsed.data.contenu,
      },
    })

    await prisma.contact.update({
      where: { id: parsed.data.contactId },
      data: { dernierContact: new Date() },
    })

    return { success: true, data: note }
  } catch (error) {
    return { success: false, error: "Impossible de creer la note" }
  }
}

export async function deleteNote(id: string): Promise<ActionResult<{ id: string }>> {
  try {
    const user = await requireUser()
    const parsed = NoteIdSchema.safeParse(id)
    if (!parsed.success) {
      return { success: false, error: "ID invalide" }
    }

    const existing = await prisma.note.findUnique({
      where: { id: parsed.data },
      include: { contact: { select: { userId: true } } },
    })
    if (!existing || existing.contact.userId !== user.id) {
      return { success: false, error: "Note introuvable" }
    }

    await prisma.note.delete({
      where: { id: parsed.data },
    })

    return { success: true, data: { id: parsed.data } }
  } catch (error) {
    return { success: false, error: "Impossible de supprimer la note" }
  }
}
