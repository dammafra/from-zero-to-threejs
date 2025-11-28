import { animated } from '@react-spring/three'
import {
  Billboard,
  CameraControls,
  Float,
  Html,
  RoundedBoxGeometry,
  type BillboardProps,
} from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'

export interface FrameProps extends BillboardProps {}

function _Frame({ children, onDoubleClick, ...props }: FrameProps) {
  const { controls } = useThree()
  const ref = useRef<Mesh>(null)

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
          <meshStandardMaterial color="#cccccc" />
        </mesh>
        <Html
          transform
          occlude="blending"
          position-y={-0.05}
          scale={0.1}
          className=" bg-white "
          style={{ width: 1000, height: 950 }}
        >
          {children}
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

              // @ts-expect-error
              onDoubleClick && setTimeout(onDoubleClick, 500)
            }}
          />
        </Html>
      </Float>
    </Billboard>
  )
}

export const Frame = animated(_Frame)
