'use client'
import dynamic from 'next/dynamic'

const ParticleNetwork = dynamic(() => import('./ParticleNetwork'), { ssr: false })

export default function ParticleNetworkLoader() {
  return <ParticleNetwork />
}
