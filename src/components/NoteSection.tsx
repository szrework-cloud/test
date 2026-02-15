"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { createNote } from "@/actions/notes"
import type { Note } from "@/generated/prisma/client"

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

interface NoteSectionProps {
  contactId: string
  initialNotes: Note[]
}

export default function NoteSection({ contactId, initialNotes }: NoteSectionProps) {
  const router = useRouter()
  const [showNoteForm, setShowNoteForm] = useState(false)
  const [newNote, setNewNote] = useState("")
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleAddNote = () => {
    if (!newNote.trim()) return
    setError("")

    startTransition(async () => {
      const result = await createNote({
        contactId,
        contenu: newNote.trim(),
      })

      if (result.success) {
        setNewNote("")
        setShowNoteForm(false)
        router.refresh()
      } else {
        setError(result.error)
      }
    })
  }

  return (
    <div className="animate-in stagger-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold tracking-tight text-text-bright">Notes</h3>
        <button onClick={() => setShowNoteForm(true)} className="btn-primary inline-flex items-center gap-1.5 !px-3 !py-2 !text-[11px]">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Ajouter une note
        </button>
      </div>

      {showNoteForm && (
        <div className="card-glow mb-4 border-primary/20 p-4">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Ecrivez votre note..."
            rows={3}
            className="input-glow w-full resize-none rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-bright placeholder:text-text-muted/40 transition-all focus:outline-none"
            autoFocus
          />
          {error && (
            <p className="mt-2 font-mono text-xs text-danger">{error}</p>
          )}
          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={() => {
                setShowNoteForm(false)
                setNewNote("")
                setError("")
              }}
              disabled={isPending}
              className="rounded-xl border border-border px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider text-text-muted transition-all hover:bg-surface-lighter hover:text-text-bright disabled:opacity-40"
            >
              Annuler
            </button>
            <button
              onClick={handleAddNote}
              disabled={!newNote.trim() || isPending}
              className="btn-primary !px-3 !py-1.5 !text-[11px] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isPending ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </div>
      )}

      {initialNotes.length > 0 ? (
        <div className="flex flex-col gap-3">
          {initialNotes.map((note, i) => (
            <div
              key={note.id}
              className={`card-glow animate-in stagger-${Math.min(i + 1, 8)} p-4 transition-all hover:border-primary/20`}
            >
              <p className="text-sm leading-relaxed text-text-bright">{note.contenu}</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                {formatDate(note.date)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="card-glow py-10 text-center">
          <p className="font-mono text-xs text-text-muted">Aucune note pour ce contact</p>
        </div>
      )}
    </div>
  )
}
