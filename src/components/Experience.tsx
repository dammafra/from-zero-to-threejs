import { CameraControls, CameraControlsImpl, Float, Outlines } from '@react-three/drei'
import { MathUtils } from 'three'
import Canvas from './Canvas'
import Environment from './Environment'
import Helpers from './Helpers'
import Presentation from './Presentation'
import Slide from './Slide'
import { AboutMe, Title } from './slides'

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
          <Title />,
          <AboutMe />,
          <Slide title="Box">
            <Float>
              <mesh position-y={0.5} castShadow>
                <boxGeometry />
                <meshStandardMaterial color="blue" />
                <Outlines thickness={0.05} color="red" />
              </mesh>
            </Float>
          </Slide>,
        ]}
      />

      <CameraControls
        makeDefault
        maxDistance={80}
        minPolarAngle={MathUtils.degToRad(0)}
        maxPolarAngle={MathUtils.degToRad(80)}
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
