import { Billboard, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { MathUtils, Object3D } from 'three'

export function Loader() {
  const ref = useRef<Object3D>(null)

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += 2 * delta
  })

  return (
    <Billboard>
      <mesh ref={ref} rotation-x={MathUtils.degToRad(45)} scale={0.5}>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <Html transform className="font-title text-white" position-y={-0.6} scale={0.6}>
        Loading
      </Html>
    </Billboard>
  )
}
