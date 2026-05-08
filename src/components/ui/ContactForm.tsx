"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactSchema, type ContactFormData } from "@/lib/contactSchema"

type Status = "idle" | "loading" | "success" | "error"

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    // zodResolver connecte react-hook-form a notre schema Zod
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        setErrorMessage(json.message ?? "Une erreur est survenue.")
        setStatus("error")
        return
      }

      setStatus("success")
      reset()
    } catch {
      setErrorMessage("Une erreur est survenue. Verifiez votre connexion.")
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-(--border) bg-(--surface) px-8 py-12 text-center">
        <span className="text-2xl">✓</span>
        <p className="font-medium">Message envoyé !</p>
        <p className="text-sm text-(--text-secondary)">
          Je vous répondrai dans les plus brefs délais.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Nom */}
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          Nom
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Votre nom"
          {...register("name")}
          className="w-full rounded-xl border border-(--border) bg-(--background) px-4 py-3 text-sm outline-none transition-colors placeholder:text-(--text-secondary) focus:border-(--foreground)"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="votre@email.com"
          {...register("email")}
          className="w-full rounded-xl border border-(--border) bg-(--background) px-4 py-3 text-sm outline-none transition-colors placeholder:text-(--text-secondary) focus:border-(--foreground)"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Votre message..."
          {...register("message")}
          className="w-full resize-none rounded-xl border border-(--border) bg-(--background) px-4 py-3 text-sm outline-none transition-colors placeholder:text-(--text-secondary) focus:border-(--foreground)"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Erreur globale (rate limit, erreur serveur...) */}
      {status === "error" && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center rounded-full bg-(--foreground) px-6 py-3 text-sm font-medium text-(--background) transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "loading" ? "Envoi en cours..." : "Envoyer"}
      </button>
    </form>
  )
}
