import { Canvas, Helpers } from '@components/helpers'
import { AboutMe, FirstScene, Goal, Resizing, Summary, Title } from '@components/slides'
import { CameraControls } from '@react-three/drei'

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
        far: 50,
        position: [2, 4, 6],
      }}
    >
      <Environment />
      <CameraControls
        makeDefault
        maxDistance={15}
        // minPolarAngle={MathUtils.degToRad(0)}
        // maxPolarAngle={MathUtils.degToRad(80)}
      />

      <Helpers />

      <Presentation backgroundColor="orange">
        <Title />
        <Goal />
        <Summary />
        <AboutMe />
        <Slide background={false} />
        <Slide background={false} />
        <FirstScene />
        <Resizing />
        <Slide title="Animazione" />
        <Slide title="Camera e Controls" />
        <Slide title="Player" />
        <Slide title="Grid" />
        <Slide title="Luci e Materiali" />
        <Slide title="Ombre" />
        <Slide title="Animazione Player" />
        <Slide title="Animazione Grid" />
        <Slide title="Fine..." />
      </Presentation>
    </Canvas>
  )
}
