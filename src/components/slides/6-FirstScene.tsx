import { DemoHint, Slide, SlideBody, SlideText, type SlideProps } from '@components'
import { Camera, Stage } from '@components/models'
import { useFrame } from '@react-three/fiber'
import { useOverlay } from '@stores'
import { useEffect, useRef } from 'react'
import { MathUtils, Object3D } from 'three'

export function FirstScene(props: SlideProps) {
  const setLogo = useOverlay(s => s.setLogo)
  const setDemo = useOverlay(s => s.setDemo)

  const cameraRef = useRef<Object3D>(null)
  const stageRef = useRef<Object3D>(null)

  useEffect(() => {
    setLogo({ position: [-0.15, 0.6, 0.2], scale: 0.15 })
    setDemo('1-first-scene')
  }, [setLogo, setDemo])

  useFrame(() => {
    if (!cameraRef.current || !stageRef.current) return
    cameraRef.current.lookAt(stageRef.current.position)
  })

  return (
    <Slide title="First Scene" {...props}>
      <SlideBody>
        <SlideText>Canvas</SlideText>
        <SlideText>+ Scene</SlideText>
        <SlideText>+ Camera</SlideText>
        <SlideText>= Render</SlideText>
      </SlideBody>

      <DemoHint />

      <group ref={stageRef} position={[0, 0, -0.3]}>
        <Camera ref={cameraRef} position={[-1.8, 2, 1.8]} scale={0.15} />
        <Stage scale={0.07} rotation-y={MathUtils.degToRad(-30)} />
      </group>
    </Slide>
  )
}
