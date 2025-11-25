import { Helper, SoftShadows } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef } from 'react'
import { CameraHelper, DirectionalLight } from 'three'

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
          value: [4, 4, 1],
          min: 0,
          max: 20,
          step: 0.01,
          label: 'directional position',
        },
      },
      { collapsed: true },
    )

  const light = useRef<DirectionalLight>(null)

  useFrame(state => {
    if (!light.current) return

    light.current.position.z = state.camera.position.z + 1
    light.current.target.position.z = state.camera.position.z
    light.current.target.updateMatrixWorld()
  })

  return (
    <>
      <directionalLight
        ref={light}
        castShadow
        position={directionalLightPosition}
        intensity={directionalLightIntensity}
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera
          attach="shadow-camera"
          near={1}
          far={50}
          top={20}
          right={20}
          bottom={-20}
          left={-20}
        >
          {helpers && <Helper type={CameraHelper} />}
        </orthographicCamera>
      </directionalLight>

      <ambientLight intensity={ambientLightIntensity} />

      <SoftShadows samples={50} />
    </>
  )
}
