import { Canvas, Helpers } from '@components/helpers'
import {
  AboutMe,
  Animating,
  Camera,
  Controls,
  Examples,
  FirstScene,
  Geometry,
  Goal,
  Grid,
  Light,
  Player,
  Resizing,
  Summary,
  Title,
  WebGL,
} from '@components/slides'
import { CameraControls } from '@react-three/drei'
import { MathUtils } from 'three'

import { Frame } from './Frame'
import { Presentation } from './Presentation'
import { Slide } from './Slide'
import { SlideBody, SlideText } from './SlideBody'

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

        <Slide title="Light e Material">
          <SlideBody bullet fontSize={0.28}>
            <SlideText>Utilizzare MeshStandardMaterial</SlideText>
            <SlideText>Aggiungere DirectionalLight</SlideText>
            <SlideText>Aggiungere AmbientLight</SlideText>
          </SlideBody>
        </Slide>

        <Slide title="Shadow">
          <SlideBody fontSize={0.28}>
            <SlideText bullet>Abilitare le ombre nel Renderer</SlideText>
            <SlideText bullet>Specificare quali luci</SlideText>
            <SlideText anchorX={-0.18}>proiettano ombre</SlideText>
            <SlideText bullet>Specificare quali oggetti</SlideText>
            <SlideText anchorX={-0.18}>proiettano ombre</SlideText>
            <SlideText bullet>Specificare quali oggetti</SlideText>
            <SlideText anchorX={-0.18}>ricevono ombre</SlideText>
          </SlideBody>
        </Slide>

        <Slide title="Animazione Player">
          <SlideBody bullet>
            <SlideText>Animazione dei passi</SlideText>
            <SlideText>Camminata in circolo</SlideText>
          </SlideBody>
        </Slide>

        <Slide title="Animazione Grid">
          <SlideBody fontSize={0.3}>
            <SlideText bullet>Ogni 5 secondi una mattonella</SlideText>
            <SlideText anchorX={-0.2}>deve sparire per poi ricomparire</SlideText>
            <SlideText bullet>Prima di scomparire deve</SlideText>
            <SlideText anchorX={-0.2}>cambiare colore come un</SlideText>
            <SlideText anchorX={-0.2}>semaforo</SlideText>
          </SlideBody>
        </Slide>

        <Slide title="Fine?">
          <Frame position={[-1.5, 1.5, 1.3]} scale={1.1}>
            <img src="/images/linktree.png" className="fixed inset-0 size-full" />
          </Frame>
        </Slide>
      </Presentation>
    </Canvas>
  )
}
