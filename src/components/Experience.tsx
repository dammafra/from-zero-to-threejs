import { Canvas, Helpers } from '@components/helpers'
import {
  AboutMe,
  Animating,
  Cameras as CamerasSlide,
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

import { Suspense } from 'react'
import { Cameras } from './Cameras'
import { Environment } from './Environment'
import { Loader } from './Loader'
import { Presentation } from './Presentation'

export function Experience() {
  return (
    <Canvas shadows>
      <Environment />
      <Cameras />
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
          <CamerasSlide />
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
