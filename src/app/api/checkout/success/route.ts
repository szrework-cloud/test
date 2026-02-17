import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id")

  if (!sessionId) {
    return NextResponse.redirect(new URL("/pricing", request.url))
  }

  // Retry up to 3 times to handle race condition with Stripe
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId)
      const customerId = typeof session.customer === "string" ? session.customer : null
      const subscriptionId = typeof session.subscription === "string" ? session.subscription : null

      if (session.payment_status === "paid" && customerId && subscriptionId) {
        await prisma.user.update({
          where: { stripeCustomerId: customerId },
          data: {
            stripeSubscriptionId: subscriptionId,
            subscriptionStatus: "active",
          },
        })
        return NextResponse.redirect(new URL("/", request.url))
      }

      // Payment not yet confirmed, wait and retry
      if (attempt < 2) {
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }
    } catch (err) {
      console.error(`[checkout/success] Attempt ${attempt + 1} failed:`, err)
      if (attempt < 2) {
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }
    }
  }

  // All retries failed — redirect to pricing instead of creating a loop
  return NextResponse.redirect(new URL("/pricing?checkout=pending", request.url))
}
