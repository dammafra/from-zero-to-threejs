import { a } from '@react-spring/three'
import { CameraControls, Text3D, useFont, useKeyboardControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useRef, type JSX, type PropsWithChildren } from 'react'
import { DoubleSide, MathUtils, Mesh, type ColorRepresentation, type Vector3Tuple } from 'three'

export type SlideProps = JSX.IntrinsicElements['group'] &
  PropsWithChildren & {
    background?: boolean
    backgroundColor?: ColorRepresentation
    title?: string
    titleSize?: number
    titlePosition?: Vector3Tuple
    titleColor?: ColorRepresentation
  }

function Slide_({
  background = true,
  backgroundColor = 'white',
  title,
  titleSize = 0.5,
  titlePosition = [-3.8, 0.02, -1.5],
  titleColor = 'red',
  children,
  ...props
}: SlideProps) {
  const { controls, size } = useThree()
  const resetPressed = useKeyboardControls(s => s.reset)

  const frameRef = useRef<Mesh>(null)

  useEffect(() => {
    const cameraControls = controls as CameraControls
    if (!frameRef.current || !cameraControls) return

    cameraControls.normalizeRotations()
    cameraControls.rotateAzimuthTo(0, true)
    cameraControls.rotatePolarTo(MathUtils.degToRad(20), true)
    cameraControls.fitToBox(frameRef.current, true, {
      paddingBottom: 0.5,
      paddingRight: 1,
      paddingLeft: 1,
    })
    cameraControls.rotatePolarTo(MathUtils.degToRad(20), true)
  }, [controls, size, resetPressed])

  useEffect(() => {
    document.title = document.title.replace(/.*\|\s/, '')
    if (title) document.title = `${title} | ${document.title}`
  }, [title])

  return (
    <>
      <group {...props}>
        {title && (
          <Text3D
            castShadow
            position={titlePosition}
            size={titleSize}
            rotation-x={MathUtils.degToRad(-90)}
            font="/fonts/Encode Sans Semi Expanded_Regular.json"
            height={0.1}
            curveSegments={5}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelSegments={3}
          >
            <meshMatcapMaterial color={titleColor} />
            {title}
          </Text3D>
        )}
        {children}
        <mesh
          receiveShadow
          visible={background}
          position={frameRef.current?.position}
          rotation={frameRef.current?.rotation}
          scale={frameRef.current?.scale}
          geometry={frameRef.current?.geometry}
        >
          <meshStandardMaterial color={backgroundColor} side={DoubleSide} />
        </mesh>
      </group>
      <mesh
        visible={false}
        ref={frameRef}
        position-y={-0.001}
        rotation-x={MathUtils.degToRad(-90)}
        scale={0.5}
      >
        <planeGeometry args={[16, 9]} />
        <meshBasicMaterial wireframe color="red" />
      </mesh>
    </>
  )
}

export const Slide = a(Slide_)

useFont.preload('/fonts/Encode Sans Semi Expanded_Regular.json')
