import { Billboard, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Object3D } from 'three'

export function Loader() {
  const ref = useRef<Object3D>(null)

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += 2 * delta
  })

  return (
    <>
      <mesh ref={ref}>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <Billboard position-y={-1.5}>
        <Html transform className="text-lg font-title text-white">
          Loading
        </Html>
      </Billboard>
    </>
  )
}
