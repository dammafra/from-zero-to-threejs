import { Canvas, Helpers } from '@components/helpers'
import {
  AboutMe,
  Animating,
  Camera,
  Controls,
  End,
  Examples,
  FirstScene,
  Geometry,
  Goal,
  Grid,
  GridAnimation,
  Light,
  Light2,
  Player,
  PlayerAnimation,
  Resizing,
  Shadow,
  Summary,
  Title,
  WebGL,
} from '@components/slides'
import { CameraControls } from '@react-three/drei'
import { MathUtils } from 'three'

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
        <Summary />
        <AboutMe />
        <WebGL />
        <Examples />
        <FirstScene />
        <Resizing />
        <Animating />
        <Camera />
        <Controls />
        <Geometry />
        <Player />
        <Grid />
        <Light />
        <Light2 />
        <Shadow />
        <PlayerAnimation />
        <GridAnimation />
        <End />
      </Presentation>
    </Canvas>
  )
}
