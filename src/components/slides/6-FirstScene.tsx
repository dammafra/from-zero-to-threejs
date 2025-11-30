import { Camera, Stage } from '@components/models'
import { Slide, type SlideProps } from '@components/Slide'
import { SlideBody, SlideText } from '@components/SlideBody'
import { useFrame } from '@react-three/fiber'
import { useOverlay } from '@stores'
import { useEffect, useRef } from 'react'
import { MathUtils, Object3D, SpotLight } from 'three'

export function FirstScene(props: SlideProps) {
  const setLogo = useOverlay(s => s.setLogo)

  const cameraRef = useRef<Object3D>(null)
  const stageRef = useRef<Object3D>(null)
  const spotLightRef = useRef<SpotLight>(null)

  useEffect(() => {
    setLogo({ position: [-0.3, 0.5, 0.5], scale: 0.2 })
  }, [setLogo])

  useFrame(() => {
    if (!cameraRef.current || !stageRef.current || !spotLightRef.current) return
    cameraRef.current.lookAt(stageRef.current.position)
    spotLightRef.current.position.copy(cameraRef.current.position)
    spotLightRef.current.target = stageRef.current
  })

  return (
    <Slide title="Prima scena" {...props}>
      <SlideBody>
        <SlideText>Canvas</SlideText>
        <SlideText>+ Scene</SlideText>
        <SlideText>+ Camera</SlideText>
        <SlideText>= Render</SlideText>
      </SlideBody>
      <Camera ref={cameraRef} position={[-1.8, 2, 1.8]} scale={0.15} />
      <Stage ref={stageRef} scale={0.08} rotation-y={MathUtils.degToRad(-30)} />
      <spotLight ref={spotLightRef} intensity={10} penumbra={0.6} />
    </Slide>
  )
}
