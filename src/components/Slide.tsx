import { Text3D, type CameraControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useRef, type JSX, type PropsWithChildren } from 'react'
import { DoubleSide, Group, MathUtils } from 'three'

export type SlideProps = JSX.IntrinsicElements['group'] &
  PropsWithChildren & {
    title?: string
    active?: boolean
  }

export default function Slide({ title, active, children, ...props }: SlideProps) {
  const { controls, size } = useThree()
  const ref = useRef<Group>(null)

  useEffect(() => {
    const cameraControls = controls as CameraControls
    if (!active || !ref.current || !cameraControls) return

    cameraControls.rotatePolarTo(MathUtils.degToRad(30), true)
    cameraControls.fitToBox(ref.current, true, {
      // paddingTop: 0.1,
      // paddingRight: 0.1,
      paddingBottom: 0.5,
      // paddingLeft: 0.1,
    })
    cameraControls.rotatePolarTo(MathUtils.degToRad(30), true)
    cameraControls.rotateAzimuthTo(0, true)
  }, [active, controls, size])

  return (
    <group ref={ref} {...props}>
      {title && (
        <Text3D
          castShadow
          position={[-3.7, 0.02, -1.2]}
          size={0.75}
          rotation-x={-Math.PI * 0.5}
          font="./fonts/helvetiker_regular.typeface.json"
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          <meshStandardMaterial color="red" />
          {title}
        </Text3D>
      )}
      {children}
      <mesh receiveShadow position-y={-0.001} rotation-x={-Math.PI * 0.5} scale={0.5}>
        <planeGeometry args={[16, 9]} />
        <meshStandardMaterial color="orange" side={DoubleSide} />
      </mesh>
    </group>
  )
}
