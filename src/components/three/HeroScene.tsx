"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"

// Surveille la classe "dark" sur <html> pour adapter les couleurs
function useIsDark() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    const update = () => setIsDark(html.classList.contains("dark"))
    update()
    const observer = new MutationObserver(update)
    observer.observe(html, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  return isDark
}

// Respecte le réglage système "réduire les animations" (WCAG 2.1 SC 2.3.3)
function usePrefersReducedMotion() {
  // Initialisation lazy : lit la valeur immédiatement sans setState synchrone dans useEffect
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return reduced
}

// Grille de sphères animées en vague
function WaveGrid({ color, reduced }: { color: string; reduced: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null)

  const COLS = 36
  const ROWS = 20
  const COUNT = COLS * ROWS
  const SPACING = 0.45

  // Objet fantoche pour calculer les matrices d'instance
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Temps accumulé manuellement via delta — évite THREE.Clock (déprécié en Three.js récent)
  const elapsed = useRef(0)

  // Placement initial statique (utilisé aussi si reduced motion)
  useEffect(() => {
    if (!mesh.current) return
    for (let i = 0; i < COUNT; i++) {
      const col = i % COLS
      const row = Math.floor(i / COLS)
      dummy.position.set(
        (col - COLS / 2) * SPACING,
        (row - ROWS / 2) * SPACING,
        0
      )
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
  }, [dummy, COUNT])

  // delta = temps écoulé depuis la dernière frame (en secondes), fourni par R3F
  useFrame((state, delta) => {
    // Aucune animation si l'utilisateur a activé "réduire les animations"
    if (reduced || !mesh.current) return
    elapsed.current += delta
    const t = elapsed.current
    const { pointer } = state

    for (let i = 0; i < COUNT; i++) {
      const col = i % COLS
      const row = Math.floor(i / COLS)

      const x = (col - COLS / 2) * SPACING
      const y = (row - ROWS / 2) * SPACING

      // Vague globale depuis le centre
      const centerDist = Math.sqrt(x * x + y * y)
      const wave = Math.sin(centerDist * 0.6 - t * 1.2) * 0.22

      // Ondulation locale autour de la souris (pointer = coords normalisées -1 à 1)
      const mx = pointer.x * 4
      const my = pointer.y * 3
      const dx = x - mx
      const dy = y - my
      const mouseDist = Math.sqrt(dx * dx + dy * dy)
      // exp(-dist) crée une atténuation gaussienne : effet fort près de la souris, nul loin
      const mouseWave =
        Math.sin(mouseDist * 1.2 - t * 2.5) * 0.18 * Math.exp(-mouseDist * 0.35)

      dummy.position.set(x, y, wave + mouseWave)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    }

    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
      {/* Rayon 0.025 - plus fin, moins encombrant */}
      <sphereGeometry args={[0.025, 6, 6]} />
      <meshBasicMaterial color={color} />
    </instancedMesh>
  )
}

// Icosaèdre wireframe flottant
function FloatingWireframe({ color }: { color: string }) {
  const { viewport } = useThree()

  const isMobile = viewport.width < 6

  // Mobile : petit, centré en arrière-plan (z plus reculé)
  // Desktop : plus grand, décalé à droite
  const position: [number, number, number] = isMobile
    ? [0, 0.5, -1.5]
    : [viewport.width * 0.3, 0.2, -0.5]

  const radius = isMobile ? 0.5 : 0.9

  return (
    // Augmentation des intensités pour plus de mouvement
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={0.8}>
      <mesh position={position}>
        <icosahedronGeometry args={[radius, 1]} />
        <meshBasicMaterial color={color} wireframe depthWrite={false} />
      </mesh>
    </Float>
  )
}

export default function HeroScene() {
  const isDark = useIsDark()
  const reduced = usePrefersReducedMotion()

  const dotColor = isDark ? "#404040" : "#d4d4d4"
  const wireColor = isDark ? "#4a4a4a" : "#cccccc"

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
    >
      <WaveGrid color={dotColor} reduced={reduced} />
      <FloatingWireframe color={wireColor} />
    </Canvas>
  )
}
