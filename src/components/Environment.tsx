import { a, useSpring } from '@react-spring/three'
import { Helper, SoftShadows } from '@react-three/drei'
import { useControls } from 'leva'
import { CameraHelper } from 'three'

interface EnvironmentProps {
  index: number
}

export function Environment({ index }: EnvironmentProps) {
  const { helpers, ambientLightIntensity, directionalLightIntensity, directionalLightPosition } =
    useControls(
      'environment',
      {
        helpers: false,
        ambientLightIntensity: {
          value: 1.5,
          min: 0,
          max: 20,
          step: 0.01,
          label: 'ambient intensity',
        },
        directionalLightIntensity: {
          value: 4.5,
          min: 0,
          max: 20,
          step: 0.01,
          label: 'directional intensity',
        },
        directionalLightPosition: {
          value: [2, 4, 1],
          min: 0,
          max: 20,
          step: 0.01,
          label: 'directional position',
        },
      },
      { collapsed: true },
    )

  const ambientSpring = useSpring({
    intensity: index === 14 ? 0 : ambientLightIntensity,
    config: { duration: 500 },
    delay: 500,
  })

  const directionalSpring = useSpring({
    intensity: index === 14 ? 0 : directionalLightIntensity,
    config: { duration: 500 },
    delay: 500,
  })

  return (
    <>
      <a.directionalLight
        castShadow
        position={directionalLightPosition}
        intensity={directionalSpring.intensity}
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera
          attach="shadow-camera"
          near={0.1}
          far={10}
          top={8}
          right={8}
          bottom={-8}
          left={-8}
        >
          {helpers && <Helper type={CameraHelper} />}
        </orthographicCamera>
      </a.directionalLight>

      <a.ambientLight intensity={ambientSpring.intensity} />

      <SoftShadows samples={50} />
    </>
  )
}
