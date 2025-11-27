import { Canvas, Helpers } from '@components/helpers'
import { AboutMe, FirstScene, Title } from '@components/slides'
import { CameraControls } from '@react-three/drei'
import { MathUtils } from 'three'

import { Environment } from './Environment'
import { Presentation } from './Presentation'
import { Slide } from './Slide'

export function Experience() {
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
      <Environment />
      <CameraControls
        makeDefault
        maxDistance={15}
        minPolarAngle={MathUtils.degToRad(0)}
        maxPolarAngle={MathUtils.degToRad(80)}
      />

      <Helpers />

      <Presentation backgroundColor="orange">
        <Title />
        <Slide title="Di cosa parleremo" />
        <AboutMe />
        <Slide title="Cosa è WebGL?" />
        <Slide title="Three.js to the rescue" />
        <FirstScene />
      </Presentation>
    </Canvas>
  )
}
