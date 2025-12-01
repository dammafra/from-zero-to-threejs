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
  Shadows,
  Title,
  WebGL,
} from '@components/slides'
import { CameraControls } from '@react-three/drei'
import { MathUtils } from 'three'

import { Suspense } from 'react'
import { Environment } from './Environment'
import { Loader } from './Loader'
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
        maxDistance={40}
        minPolarAngle={MathUtils.degToRad(0)}
        maxPolarAngle={MathUtils.degToRad(80)}
      />

      <Helpers />

      <Suspense fallback={<Loader />}>
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
          <Shadows />
          <CharacterAnimation />
          <GridAnimation />
          <End />
        </Presentation>
      </Suspense>
    </Canvas>
  )
}
