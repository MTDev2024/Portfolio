/**
 * Rate limiter en mémoire pour les API Routes
 *
 * Limite le nombre de requêtes par IP sur une période donnée.
 * Sans dépendance externe — suffisant pour un portfolio.
 *
 * ⚠️ Non persistant entre redémarrages serverless.
 * Pour une solution persistante en production : Upstash Redis (@upstash/ratelimit).
 */
const store = new Map<string, { count: number; resetAt: number }>()

/**
 * Vérifie si une IP a dépassé la limite de requêtes
 * @param ip - Adresse IP du visiteur
 * @param limit - Nombre max de requêtes autorisées (défaut : 3)
 * @param windowMs - Durée de la fenêtre en ms (défaut : 30 min)
 */
export function checkRateLimit(
  ip: string,
  limit = 3,
  windowMs = 30 * 60 * 1000
): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: limit - 1 }
  }

  if (entry.count < limit) {
    entry.count++
    return { allowed: true, remaining: limit - entry.count }
  }

  return { allowed: false, remaining: 0 }
}
