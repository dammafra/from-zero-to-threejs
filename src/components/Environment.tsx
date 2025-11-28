import { Helper, SoftShadows } from '@react-three/drei'
import { useControls } from 'leva'
import { CameraHelper } from 'three'

export function Environment() {
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

  return (
    <>
      <directionalLight
        castShadow
        position={directionalLightPosition}
        intensity={directionalLightIntensity}
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
      </directionalLight>

      <ambientLight intensity={ambientLightIntensity} />

      <SoftShadows samples={50} />
    </>
  )
}
