import {
  Billboard,
  CameraControls,
  Float,
  Html,
  RoundedBoxGeometry,
  type BillboardProps,
} from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'

interface ExampleProps extends Omit<BillboardProps, 'name'> {
  name: string
  canvasScale?: number
  interactive?: boolean
}

export function Example({ name, canvasScale = 0.1, interactive = true, ...props }: ExampleProps) {
  const { controls } = useThree()
  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    import(`../examples/${name}.js`)

    const handler = () => setFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [name])

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
        <mesh castShadow position-z={-0.06} scale={[2.8, 2.8, 0.1]}>
          <RoundedBoxGeometry />
          <meshStandardMaterial />
        </mesh>
        <Html
          transform
          occlude
          position-y={-0.05}
          scale={canvasScale}
          wrapperClass={fullscreen ? 'bg-black' : 'bg-transparent'}
        >
          <canvas
            id={name}
            className={`rounded-4xl ${!props.visible && 'hidden'}`}
            onMouseEnter={() => {
              const cameraControls = controls as CameraControls
              cameraControls.enabled = !interactive
            }}
            onMouseLeave={() => {
              const cameraControls = controls as CameraControls
              cameraControls.enabled = interactive
            }}
            onDoubleClick={() => {
              if (fullscreen) document.exitFullscreen()
              else document.getElementById(name)?.requestFullscreen()
            }}
          />
        </Html>
      </Float>
    </Billboard>
  )
}
