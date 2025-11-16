import { CameraControls, CameraControlsImpl } from '@react-three/drei'
import { MathUtils } from 'three'
import Canvas from './Canvas'
import Environment from './Environment'
import Helpers from './Helpers'
import Presentation from './Presentation'
import Slide from './Slide'
import { AboutMe, FirstScene, Title } from './slides'

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
      <Presentation buffer={1} backgroundColor="orange">
        <Title />
        <Slide title="Di cosa parleremo" />
        <AboutMe />
        <Slide title="Cosa è WebGL?" />
        <Slide title="Three.js to the rescue" />
        <FirstScene />
      </Presentation>

      <CameraControls
        makeDefault
        maxDistance={15}
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
