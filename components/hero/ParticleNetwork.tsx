'use client'
import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

const PARTICLE_COUNT = 2000
const NODE_COUNT = 40

interface PhaseRef {
  current: number
}

function Particles({ phase }: { phase: PhaseRef }) {
  const meshRef = useRef<THREE.Points>(null)
  const { mouse } = useThree()

  const { positions, targets } = useMemo(() => {
    // Chaos positions — random spread
    const chaos = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      chaos[i] = (Math.random() - 0.5) * 20
    }

    // Neural network node positions — organized clusters
    const nodes = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const nodeIdx = i % NODE_COUNT
      const angle = (nodeIdx / NODE_COUNT) * Math.PI * 2
      const radius = 3 + Math.sin(nodeIdx * 0.5) * 1.5
      const layer = Math.floor(nodeIdx / 8)
      nodes[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.5
      nodes[i * 3 + 1] = Math.sin(angle) * radius * 0.6 + layer * 1.5 - 3 + (Math.random() - 0.5) * 0.5
      nodes[i * 3 + 2] = (Math.random() - 0.5) * 2
    }

    return { positions: chaos, targets: nodes }
  }, [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3))
    return geo
  }, [positions])

  useFrame((state) => {
    if (!meshRef.current) return
    const posAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute
    const pos = posAttr.array as Float32Array
    const t = state.clock.elapsedTime

    const p = phase.current

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      if (p < 1) {
        // Phase 0→1: chaos drift
        pos[i3] += Math.sin(t * 0.3 + i * 0.01) * 0.002
        pos[i3 + 1] += Math.cos(t * 0.2 + i * 0.007) * 0.002
      } else if (p < 2) {
        // Phase 1→2: emerge toward network
        const blend = p - 1
        pos[i3] += (targets[i3] - pos[i3]) * 0.02 * blend
        pos[i3 + 1] += (targets[i3 + 1] - pos[i3 + 1]) * 0.02 * blend
        pos[i3 + 2] += (targets[i3 + 2] - pos[i3 + 2]) * 0.02 * blend
      } else if (p < 3) {
        // Phase 2→3: interactive — mouse gravity
        const mx = mouse.x * 5
        const my = mouse.y * 3
        pos[i3] += (mx - pos[i3]) * 0.001 + Math.sin(t + i) * 0.003
        pos[i3 + 1] += (my - pos[i3 + 1]) * 0.001 + Math.cos(t + i) * 0.003
      } else {
        // Phase 3: recede on scroll
        pos[i3] *= 0.995
        pos[i3 + 1] *= 0.995
        pos[i3 + 2] -= 0.01
      }
    }

    posAttr.needsUpdate = true
  })

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        color="#00d4ff"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  )
}

function Connections() {
  const lineRef = useRef<THREE.LineSegments>(null)

  const geometry = useMemo(() => {
    // Draw connections between adjacent neural network nodes
    const positions: number[] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      const angle = (i / NODE_COUNT) * Math.PI * 2
      const radius = 3 + Math.sin(i * 0.5) * 1.5
      const layer = Math.floor(i / 8)
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius * 0.6 + layer * 1.5 - 3
      const z = 0

      // Connect to next node
      const nextI = (i + 1) % NODE_COUNT
      const nextAngle = (nextI / NODE_COUNT) * Math.PI * 2
      const nextRadius = 3 + Math.sin(nextI * 0.5) * 1.5
      const nextLayer = Math.floor(nextI / 8)
      const nx = Math.cos(nextAngle) * nextRadius
      const ny = Math.sin(nextAngle) * nextRadius * 0.6 + nextLayer * 1.5 - 3

      positions.push(x, y, z, nx, ny, 0)
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3))
    return geo
  }, [])

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#7c3aed" transparent opacity={0.3} />
    </lineSegments>
  )
}

function Scene() {
  const phase = useRef<number>(0)

  useEffect(() => {
    // Phase timeline: 0 chaos → 1 emerge → 2 interact → 3 recede
    const tl = gsap.timeline()
    tl.to(phase, { current: 1, duration: 2, ease: 'power2.inOut', delay: 0.5 })
      .to(phase, { current: 2, duration: 2, ease: 'power2.inOut' })

    // Recede on scroll
    const trigger = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: '30% top',
      onUpdate: (self) => {
        phase.current = 2 + self.progress
      },
    })

    return () => {
      tl.kill()
      trigger.kill()
    }
  }, [])

  return (
    <>
      <Particles phase={phase} />
      <Connections />
      <ambientLight intensity={0.5} />
    </>
  )
}

export default function ParticleNetwork() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
