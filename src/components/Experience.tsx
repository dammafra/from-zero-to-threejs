import { CameraControls, CameraControlsImpl, Outlines } from '@react-three/drei'
import Canvas from './Canvas'
import Environment from './Environment'
import Helpers from './Helpers'
import Presentation from './Presentation'
import Slide from './Slide'

export default function Experience() {
  return (
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 100,
        position: [2, 4, 6],
      }}
    >
      <Presentation
        slides={[
          <Slide title="Slide 1">
            <mesh position-y={0.5} castShadow>
              <boxGeometry />
              <meshStandardMaterial color="blue" />
              <Outlines thickness={0.05} color="red" />
            </mesh>
          </Slide>,
          <Slide title="Slide 2">
            <mesh scale={0.5} position-y={0.5} castShadow>
              <sphereGeometry />
              <meshStandardMaterial color="red" />
            </mesh>
          </Slide>,
        ]}
      />

      <CameraControls
        makeDefault
        maxDistance={80}
        mouseButtons={{
          left: CameraControlsImpl.ACTION.TRUCK,
          right: CameraControlsImpl.ACTION.ROTATE,
          middle: CameraControlsImpl.ACTION.DOLLY,
          wheel: CameraControlsImpl.ACTION.DOLLY,
        }}
        touches={{
          one: CameraControlsImpl.ACTION.TOUCH_TRUCK,
          two: CameraControlsImpl.ACTION.TOUCH_DOLLY,
          three: CameraControlsImpl.ACTION.TOUCH_ROTATE,
        }}
      />

      <Environment />
      <Helpers />
    </Canvas>
  )
}
