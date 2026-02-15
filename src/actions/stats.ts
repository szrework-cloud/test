"use server"

import { prisma } from "@/lib/db"

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string }

interface Stats {
  totalContacts: number
  contactsCeMois: number
  notesCetteSemaine: number
}

interface StatusDistributionItem {
  name: string
  value: number
  fill: string
}

export async function getStats(): Promise<ActionResult<Stats>> {
  try {
    const totalContacts = await prisma.contact.count()

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const contactsCeMois = await prisma.contact.count({
      where: {
        dateAjout: { gte: startOfMonth },
      },
    })

    const startOfWeek = new Date(now)
    const day = startOfWeek.getDay()
    const diff = day === 0 ? 6 : day - 1
    startOfWeek.setDate(startOfWeek.getDate() - diff)
    startOfWeek.setHours(0, 0, 0, 0)

    const notesCetteSemaine = await prisma.note.count({
      where: {
        date: { gte: startOfWeek },
      },
    })

    return {
      success: true,
      data: { totalContacts, contactsCeMois, notesCetteSemaine },
    }
  } catch (error) {
    return { success: false, error: "Impossible de charger les statistiques" }
  }
}

export async function getStatusDistribution(): Promise<ActionResult<StatusDistributionItem[]>> {
  try {
    const [clients, prospects, perdus] = await Promise.all([
      prisma.contact.count({ where: { statut: "client" } }),
      prisma.contact.count({ where: { statut: "prospect" } }),
      prisma.contact.count({ where: { statut: "perdu" } }),
    ])

    return {
      success: true,
      data: [
        { name: "Clients", value: clients, fill: "#22C55E" },
        { name: "Prospects", value: prospects, fill: "#3B82F6" },
        { name: "Perdus", value: perdus, fill: "#EF4444" },
      ],
    }
  } catch (error) {
    return { success: false, error: "Impossible de charger la distribution" }
  }
}
