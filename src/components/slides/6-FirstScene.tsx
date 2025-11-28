import { Camera, Stage } from '@components/models'
import { Slide, type SlideProps } from '@components/Slide'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Object3D, SpotLight } from 'three'

export function FirstScene(props: SlideProps) {
  const cameraRef = useRef<Object3D>(null)
  const stageRef = useRef<Object3D>(null)
  const spotLightRef = useRef<SpotLight>(null)

  useFrame(() => {
    if (!cameraRef.current || !stageRef.current || !spotLightRef.current) return
    cameraRef.current.lookAt(stageRef.current.position)
    spotLightRef.current.position.copy(cameraRef.current.position)
    spotLightRef.current.target = stageRef.current
  })

  return (
    <Slide title="Prima scena" {...props}>
      <Camera ref={cameraRef} position={[-2, 2, 1.7]} scale={0.2} />
      <Stage ref={stageRef} position={[-1.5, 0, -0.3]} scale={0.1} />
      <spotLight ref={spotLightRef} intensity={10} penumbra={0.6} />
    </Slide>
  )
}
