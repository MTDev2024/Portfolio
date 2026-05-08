// Variables d'environnement requises dans .env.local :
// RESEND_API_KEY=re_xxxxxxxxxxxx
// RESEND_FROM_EMAIL=onboarding@resend.dev  (remplacer par ton domaine verifie)
// RESEND_TO_EMAIL=mt.dev.2023@gmail.com

import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { contactSchema } from "@/lib/contactSchema"
import { checkRateLimit } from "@/lib/rateLimiter"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    // Recuperation de l'IP - X-Forwarded-For est l'en-tete standard sur Vercel
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

    // Validation cote serveur - ne jamais faire confiance aux donnees du client
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Donnees invalides." },
        { status: 400 }
      )
    }

    const { name, email, message } = result.data

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
      to: process.env.RESEND_TO_EMAIL ?? "mt.dev.2023@gmail.com",
      replyTo: email,
      subject: `Message de ${name} via le portfolio`,
      text: `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, message: "Une erreur est survenue. Reessayez plus tard." },
      { status: 500 }
    )
  }
}
