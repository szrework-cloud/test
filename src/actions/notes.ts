"use server"

import { prisma } from "@/lib/db"
import {
  CreateNoteSchema,
  NoteIdSchema,
  type CreateNoteInput,
} from "@/lib/validations/note"

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string }

export async function getNotesByContactId(contactId: string): Promise<ActionResult<Awaited<ReturnType<typeof prisma.note.findMany>>>> {
  try {
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
    const parsed = CreateNoteSchema.safeParse(data)
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Donnees invalides"
      return { success: false, error: firstError }
    }

    const contact = await prisma.contact.findUnique({
      where: { id: parsed.data.contactId },
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
    const parsed = NoteIdSchema.safeParse(id)
    if (!parsed.success) {
      return { success: false, error: "ID invalide" }
    }

    const existing = await prisma.note.findUnique({
      where: { id: parsed.data },
    })
    if (!existing) {
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
