import { z } from "zod"

// Schema partage entre le formulaire (validation cote client) et l'API route (validation cote serveur)
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caracteres")
    .max(100, "Le nom est trop long"),

  email: z.string().email("Adresse email invalide"),

  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caracteres")
    .max(2000, "Le message est trop long"),
})

// Type infere automatiquement depuis le schema
export type ContactFormData = z.infer<typeof contactSchema>
