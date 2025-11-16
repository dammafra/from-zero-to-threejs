import { Text3D, type CameraControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useRef, type JSX, type PropsWithChildren } from 'react'
import { DoubleSide, MathUtils, Mesh, type ColorRepresentation } from 'three'

export type SlideProps = JSX.IntrinsicElements['group'] &
  PropsWithChildren & {
    active?: boolean
    background?: boolean
    backgroundColor?: ColorRepresentation
    title?: string
    titleColor?: ColorRepresentation
  }

export default function Slide({
  active,
  background = true,
  backgroundColor = 'white',
  title,
  titleColor = 'red',
  children,
  ...props
}: SlideProps) {
  const { controls, size } = useThree()
  const ref = useRef<Mesh>(null)

  useEffect(() => {
    const cameraControls = controls as CameraControls
    if (!active || !ref.current || !cameraControls) return

    cameraControls.rotatePolarTo(MathUtils.degToRad(20), true)
    cameraControls.fitToBox(ref.current, true, {
      paddingBottom: 0.5,
      paddingRight: 1,
      paddingLeft: 1,
    })
    cameraControls.rotatePolarTo(MathUtils.degToRad(20), true)
    cameraControls.normalizeRotations()
    cameraControls.rotateAzimuthTo(0, true)
  }, [active, controls, size])

  return (
    <group {...props}>
      {title && (
        <Text3D
          castShadow
          position={[-3.8, 0.02, -1.5]}
          size={0.5}
          rotation-x={MathUtils.degToRad(-90)}
          font="./fonts/Encode Sans Semi Expanded_Regular.json"
          height={0.1}
          curveSegments={active ? 5 : 3}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelSegments={active ? 3 : 1}
        >
          <meshMatcapMaterial color={titleColor} />
          {title}
        </Text3D>
      )}
      {children}
      <mesh
        ref={ref}
        visible={background}
        receiveShadow
        position-y={-0.001}
        rotation-x={MathUtils.degToRad(-90)}
        scale={0.5}
      >
        <planeGeometry args={[16, 9]} />
        <meshStandardMaterial color={backgroundColor} side={DoubleSide} />
      </mesh>
    </group>
  )
}
