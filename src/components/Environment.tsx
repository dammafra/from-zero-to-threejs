import { a, useSpring } from '@react-spring/three'
import { Helper, SoftShadows } from '@react-three/drei'
import { useEnvironment } from '@stores'
import { useControls } from 'leva'
import { CameraHelper } from 'three'

export function Environment() {
  const lights = useEnvironment(s => s.lights)

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

  const ambientSpring = useSpring({ intensity: lights ? ambientLightIntensity : 0 })
  const directionalSpring = useSpring({ intensity: lights ? directionalLightIntensity : 0 })

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
