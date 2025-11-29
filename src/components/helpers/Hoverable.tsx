import { useCursor } from '@react-three/drei'
import { useState, type JSX } from 'react'

type HoverableProps = JSX.IntrinsicElements['group'] & {
  enabled?: boolean
}

export function Hoverable({ enabled = true, children, ...props }: HoverableProps) {
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  return enabled ? (
    <group onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <group {...props}>{children}</group>
    </group>
  ) : (
    children
  )
}
