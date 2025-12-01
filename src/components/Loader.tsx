import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Object3D } from 'three'

export function Loader() {
  const ref = useRef<Object3D>(null)

  useEffect(() => {
    const loader = document.getElementById('loader')
    if (!loader) return

    loader.style.visibility = 'visible'

    return () => loader.remove()
  }, [])

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += 2 * delta
  })

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}
