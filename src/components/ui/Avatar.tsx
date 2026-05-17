import Image from "next/image"

type AvatarProps = {
  variant?: "front" | "three-quarter"
  className?: string
}

export default function Avatar({
  variant = "front",
  className = "",
}: AvatarProps) {
  // "front" → Hero (de face) | "three-quarter" → About (trois-quarts)
  const src =
    variant === "front" ? "/avatar-front.jpg" : "/avatar-three-quarter.svg"

  return (
    <Image
      src={src}
      // Alt différent par variante pour les lecteurs d'écran
      alt={
        variant === "front"
          ? "Avatar développeur de face"
          : "Portrait développeur"
      }
      width={112}
      height={112}
      className={`rounded-full ${className}`}
      // priority=true uniquement sur "front" : c'est dans le Hero, visible sans scroll
      // "three-quarter" est dans About (below the fold) → pas besoin de préchargement
      priority={variant === "front"}
    />
  )
}
