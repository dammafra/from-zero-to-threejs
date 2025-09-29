import { Text3D, type CameraControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useRef, type JSX, type PropsWithChildren } from 'react'
import { DoubleSide, MathUtils, Mesh } from 'three'

export type SlideProps = JSX.IntrinsicElements['group'] &
  PropsWithChildren & {
    title?: string
    active?: boolean
    background?: boolean
  }

export default function Slide({
  title,
  active,
  background = true,
  children,
  ...props
}: SlideProps) {
  const { controls, size } = useThree()
  const ref = useRef<Mesh>(null)

  useEffect(() => {
    const cameraControls = controls as CameraControls
    if (!active || !ref.current || !cameraControls) return

    cameraControls.rotatePolarTo(MathUtils.degToRad(30), true)
    cameraControls.fitToBox(ref.current, true, {
      paddingBottom: 0.5,
      paddingRight: 1,
      paddingLeft: 1,
    })
    cameraControls.rotatePolarTo(MathUtils.degToRad(30), true)
    cameraControls.normalizeRotations()
    cameraControls.rotateAzimuthTo(0, true)
  }, [active, controls, size])

  return (
    <group {...props}>
      {title && (
        <Text3D
          castShadow
          receiveShadow
          position={[-3.8, 0.02, -1.5]}
          size={0.5}
          rotation-x={-Math.PI * 0.5}
          font="./fonts/helvetiker_regular.typeface.json"
          height={0.1}
          curveSegments={24}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelSegments={5}
        >
          <meshStandardMaterial color="brown" />
          {title}
        </Text3D>
      )}
      {children}
      <mesh
        ref={ref}
        visible={background}
        receiveShadow
        position-y={-0.001}
        rotation-x={-Math.PI * 0.5}
        scale={0.5}
      >
        <planeGeometry args={[16, 9]} />
        <meshStandardMaterial color="orange" side={DoubleSide} />
      </mesh>
    </group>
  )
}
