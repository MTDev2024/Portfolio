"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"

function useIsDark(): boolean {
  const [isDark, setIsDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"),
  )

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"))
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])

  return isDark
}

/**
 * Lit --accent depuis globals.css via getComputedStyle.
 * Réagit au changement de thème (MutationObserver sur <html>).
 */
function useAccentColor(): string {
  const [color, setColor] = useState("#7c3aed")

  useEffect(() => {
    const update = () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim()
      if (value) setColor(value)
    }
    update()
    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])

  return color
}

function usePrefersReducedMotion() {
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

const SPACING = 0.45
// Desktop : grille complète
const COLS_D = 36
const ROWS_D = 20
// Mobile : grille réduite (286 instances vs 720)
const COLS_M = 22
const ROWS_M = 13
// Allocation max de l'InstancedMesh — fixe pour éviter de recréer le GPU buffer
const MAX_COUNT = COLS_D * ROWS_D

function WaveGrid({ color, reduced }: { color: string; reduced: boolean }) {
  const { viewport } = useThree()
  const mobile = viewport.width < 6

  const COLS = mobile ? COLS_M : COLS_D
  const ROWS = mobile ? ROWS_M : ROWS_D
  const COUNT = COLS * ROWS

  const mesh = useRef<THREE.InstancedMesh>(null)
  const elapsed = useRef(0)
  const tempMatrix = useMemo(() => new THREE.Matrix4(), [])

  // Pre-compute x, y et centerDist pour éviter 720 Math.sqrt par frame
  const base = useMemo(() => {
    const arr = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const x = (i % COLS - COLS / 2) * SPACING
      const y = (Math.floor(i / COLS) - ROWS / 2) * SPACING
      arr[i * 3] = x
      arr[i * 3 + 1] = y
      arr[i * 3 + 2] = Math.sqrt(x * x + y * y)
    }
    return arr
  }, [COLS, ROWS, COUNT])

  // Adapte le nombre d'instances visibles sans recréer le GPU buffer
  useEffect(() => {
    if (!mesh.current) return
    mesh.current.count = COUNT
  }, [COUNT])

  // Placement statique initial
  useEffect(() => {
    if (!mesh.current) return
    for (let i = 0; i < COUNT; i++) {
      tempMatrix.makeTranslation(base[i * 3], base[i * 3 + 1], 0)
      mesh.current.setMatrixAt(i, tempMatrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
  }, [base, COUNT, tempMatrix])

  useFrame((state, delta) => {
    if (reduced || !mesh.current) return
    elapsed.current += delta
    const t = elapsed.current

    // Sur mobile : pas d'interaction souris (touch only), économise ~COUNT multiplications
    const mx = mobile ? 0 : state.pointer.x * 4
    const my = mobile ? 0 : state.pointer.y * 3

    for (let i = 0; i < COUNT; i++) {
      const x = base[i * 3]
      const y = base[i * 3 + 1]
      const centerDist = base[i * 3 + 2]

      const wave = Math.sin(centerDist * 0.6 - t * 1.2) * 0.22

      let z = wave
      if (!mobile) {
        const dx = x - mx
        const dy = y - my
        const mouseDist = Math.sqrt(dx * dx + dy * dy)
        z += Math.sin(mouseDist * 1.2 - t * 2.5) * 0.18 * Math.exp(-mouseDist * 0.35)
      }

      tempMatrix.makeTranslation(x, y, z)
      mesh.current.setMatrixAt(i, tempMatrix)
    }

    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, MAX_COUNT]}>
      <sphereGeometry args={[0.025, 6, 6]} />
      <meshBasicMaterial color={color} />
    </instancedMesh>
  )
}

function FloatingWireframe({ color }: { color: string }) {
  const { viewport } = useThree()
  const isMobile = viewport.width < 6

  const position: [number, number, number] = isMobile
    ? [0, 0.5, -1.5]
    : [viewport.width * 0.3, 0.2, -0.5]

  const radius = isMobile ? 0.5 : 0.9

  return (
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
  const wireColor = useAccentColor()
  const dotColor = isDark ? "#404040" : "#d4d4d4"

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
