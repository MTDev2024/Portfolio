import { NextRequest, NextResponse } from "next/server"
import { contactSchema } from "@/lib/contactSchema"
import { checkRateLimit } from "@/lib/rateLimiter"

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvzjqpar"

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous"

    const { allowed } = checkRateLimit(ip)

    if (!allowed) {
      return NextResponse.json(
        { success: false, message: "Trop de tentatives. Reessayez dans 30 minutes." },
        { status: 429 }
      )
    }

    const body = await req.json()

    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Donnees invalides." },
        { status: 400 }
      )
    }

    const { name, email, message } = result.data

    const formspreeRes = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    })

    if (!formspreeRes.ok) {
      return NextResponse.json(
        { success: false, message: "Une erreur est survenue. Reessayez plus tard." },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, message: "Une erreur est survenue. Reessayez plus tard." },
      { status: 500 }
    )
  }
}
