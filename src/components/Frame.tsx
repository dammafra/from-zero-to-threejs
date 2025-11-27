import { a, useSpring } from '@react-spring/web'
import {
  Billboard,
  CameraControls,
  Float,
  Html,
  RoundedBoxGeometry,
  type BillboardProps,
} from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { Mesh } from 'three'
import { useLocation } from 'wouter'

interface FrameProps extends BillboardProps {
  src: string
}

export function Frame({ src, ...props }: FrameProps) {
  const [, navigate] = useLocation()
  const { controls } = useThree()

  const ref = useRef<Mesh>(null)
  const [loaded, setLoaded] = useState(false)
  const springs = useSpring({ opacity: loaded ? 1 : 0 })

  return (
    <Billboard {...props}>
      <Float>
        <mesh scale={0.05} position={[-1.25, 1.25, 0]}>
          <circleGeometry />
          <meshBasicMaterial color="red" />
        </mesh>
        <mesh scale={0.05} position={[-1.1, 1.25, 0]}>
          <circleGeometry />
          <meshBasicMaterial color="orange" />
        </mesh>
        <mesh scale={0.05} position={[-0.95, 1.25, 0]}>
          <circleGeometry />
          <meshBasicMaterial color="green" />
        </mesh>
        <mesh ref={ref} castShadow position={[0, 0, -0.06]} scale={[2.8, 2.8, 0.1]}>
          <RoundedBoxGeometry />
          <meshStandardMaterial />
        </mesh>
        <Html
          transform
          position-y={-0.05}
          scale={0.1}
          className="rounded-4xl border-4"
          style={{ width: 1000, height: 950 }}
        >
          <a.iframe
            className="rounded-4xl h-full w-full pointer-events-none"
            src={src}
            onLoad={() => setLoaded(true)}
            style={springs}
          />
          <div
            className="fixed inset-0 cursor-pointer"
            onDoubleClick={() => {
              const cameraControls = controls as CameraControls
              if (!ref.current || !cameraControls) return

              cameraControls.fitToBox(ref.current, true, {
                paddingTop: -1,
                paddingBottom: -1,
                paddingRight: -1,
                paddingLeft: -1,
              })

              setTimeout(() => navigate(`~/demo/${encodeURIComponent(src)}`), 500)
            }}
          />
        </Html>
      </Float>
    </Billboard>
  )
}
