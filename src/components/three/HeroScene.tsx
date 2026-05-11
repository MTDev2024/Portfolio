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
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return reduced
}

// Grille de sphères animées en vague
function WaveGrid({ color, reduced }: { color: string; reduced: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null)

  const COLS = 30
  const ROWS = 18
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
        0,
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
        Math.sin(mouseDist * 1.2 - t * 2.5) *
        0.18 *
        Math.exp(-mouseDist * 0.35)

      dummy.position.set(x, y, wave + mouseWave)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    }

    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
      {/* Rayon 0.025 — plus fin, moins encombrant */}
      <sphereGeometry args={[0.025, 6, 6]} />
      <meshBasicMaterial color={color} />
    </instancedMesh>
  )
}

// Icosaèdre wireframe flottant
function FloatingWireframe({ color }: { color: string }) {
  // useThree donne accès aux dimensions du viewport EN UNITÉS 3D
  // (pas en pixels — c'est la largeur visible dans la scène à z=0)
  const { viewport } = useThree()

  // Sur mobile portrait le viewport 3D est trop étroit (~2.7 unités)
  // Le wireframe serait hors champ ou masquerait le contenu — on ne l'affiche pas
  if (viewport.width < 6) return null

  // Position dynamique : 30% de la largeur viewport vers la droite
  const x = viewport.width * 0.3

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.4}>
      <mesh position={[x, 0.2, -0.5]}>
        {/* detail=1 → subdivise une fois → ~80 triangles */}
        <icosahedronGeometry args={[0.9, 1]} />
        {/*
          depthWrite={false} → le wireframe n'écrit pas dans le depth buffer
          → les dots derrière ses faces restent visibles
        */}
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
      // alpha: true → fond transparent, la couleur de page passe au travers
      gl={{ antialias: true, alpha: true }}
      // Limite le device pixel ratio à 1.5 pour économiser le GPU sur les écrans retina
      dpr={[1, 1.5]}
    >
      <WaveGrid color={dotColor} reduced={reduced} />
      <FloatingWireframe color={wireColor} />
    </Canvas>
  )
}
