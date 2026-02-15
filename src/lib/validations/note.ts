import { z } from "zod"

export const CreateNoteSchema = z.object({
  contactId: z.string().min(1, "Contact ID requis"),
  contenu: z.string().min(1, "Le contenu est requis").max(5000),
})

export const NoteIdSchema = z.string().min(1, "ID requis")

export type CreateNoteInput = z.infer<typeof CreateNoteSchema>
