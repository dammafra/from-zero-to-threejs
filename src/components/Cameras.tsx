import { CameraControls, OrthographicCamera, PerspectiveCamera } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useCameras } from '@stores'
import { useRef } from 'react'
import {
  MathUtils,
  OrthographicCamera as OrthographicCameraImpl,
  PerspectiveCamera as PerspectiveCameraImpl,
} from 'three'

export function Cameras() {
  const orthographic = useCameras(s => s.orthographic)

  const { controls } = useThree()
  const perspectiveCameraRef = useRef<PerspectiveCameraImpl>(null)
  const orthographicCameraRef = useRef<OrthographicCameraImpl>(null)

  useFrame(() => {
    const cameraControls = controls as CameraControls
    if (!cameraControls || !perspectiveCameraRef.current || !orthographicCameraRef.current) return

    perspectiveCameraRef.current.position.copy(cameraControls.camera.position)
    perspectiveCameraRef.current.rotation.copy(cameraControls.camera.rotation)

    orthographicCameraRef.current.position.copy(cameraControls.camera.position)
    orthographicCameraRef.current.rotation.copy(cameraControls.camera.rotation)
  })

  return (
    <>
      <CameraControls
        makeDefault
        maxDistance={40}
        minPolarAngle={MathUtils.degToRad(0)}
        maxPolarAngle={MathUtils.degToRad(80)}
      />

      <PerspectiveCamera
        ref={perspectiveCameraRef}
        fov={45}
        near={0.1}
        far={50}
        position={[0, 6, 2.5]}
        makeDefault={!orthographic}
      />
      <OrthographicCamera
        ref={orthographicCameraRef}
        near={-50}
        far={50}
        zoom={150}
        makeDefault={orthographic}
      />
    </>
  )
}
