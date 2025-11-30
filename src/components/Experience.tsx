import { Canvas, Helpers } from '@components/helpers'
import {
  AboutMe,
  Animating,
  Cameras,
  Character,
  CharacterAnimation,
  Controls,
  End,
  Examples,
  FirstScene,
  Geometries,
  Goal,
  Grid,
  GridAnimation,
  Lights,
  Lights2,
  Overview,
  Resizing,
  Shadow,
  Title,
  WebGL,
} from '@components/slides'
import { CameraControls } from '@react-three/drei'
import { MathUtils } from 'three'

import { Environment } from './Environment'
import { Presentation } from './Presentation'

export function Experience() {
  return (
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 50,
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
        <Goal />
        <Overview />
        <AboutMe />
        <WebGL />
        <Examples />
        <FirstScene />
        <Resizing />
        <Animating />
        <Cameras />
        <Controls />
        <Geometries />
        <Character />
        <Grid />
        <Lights />
        <Lights2 />
        <Shadow />
        <CharacterAnimation />
        <GridAnimation />
        <End />
      </Presentation>
    </Canvas>
  )
}
