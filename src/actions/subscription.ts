"use server"

import { getStripe } from "@/lib/stripe"
import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function createCheckoutSession(): Promise<{ url: string } | { error: string }> {
  const user = await getCurrentUser()
  if (!user) return { error: "Non authentifie" }

  const dbUser = await prisma.user.findUniqueOrThrow({ where: { id: user.id } })

  let customerId = dbUser.stripeCustomerId

  if (!customerId) {
    const customer = await getStripe().customers.create({
      email: dbUser.email,
      metadata: { userId: dbUser.id },
    })
    customerId = customer.id
    await prisma.user.update({
      where: { id: dbUser.id },
      data: { stripeCustomerId: customerId },
    })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

  const session = await getStripe().checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    success_url: `${appUrl}/api/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/pricing?checkout=cancel`,
    subscription_data: {
      metadata: { userId: dbUser.id },
    },
  })

  if (!session.url) {
    return { error: "Impossible de creer la session de paiement" }
  }

  redirect(session.url)
}

export async function createPortalSession(): Promise<{ url: string } | { error: string }> {
  const user = await getCurrentUser()
  if (!user) return { error: "Non authentifie" }

  const dbUser = await prisma.user.findUniqueOrThrow({ where: { id: user.id } })

  if (!dbUser.stripeCustomerId) {
    return { error: "Aucun abonnement Stripe associe" }
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

  const session = await getStripe().billingPortal.sessions.create({
    customer: dbUser.stripeCustomerId,
    return_url: `${appUrl}/parametres`,
  })

  redirect(session.url)
}

export async function getSubscriptionStatus(): Promise<{
  status: string
  renewsAt: string | null
} | { error: string }> {
  const user = await getCurrentUser()
  if (!user) return { error: "Non authentifie" }

  const dbUser = await prisma.user.findUniqueOrThrow({ where: { id: user.id } })

  if (!dbUser.stripeSubscriptionId) {
    return { status: dbUser.subscriptionStatus, renewsAt: null }
  }

  try {
    const subscription = await getStripe().subscriptions.retrieve(dbUser.stripeSubscriptionId)
    const periodEnd = subscription.items.data[0]?.current_period_end
    const renewsAt = periodEnd ? new Date(periodEnd * 1000).toISOString() : null
    return { status: dbUser.subscriptionStatus, renewsAt }
  } catch {
    return { status: dbUser.subscriptionStatus, renewsAt: null }
  }
}
