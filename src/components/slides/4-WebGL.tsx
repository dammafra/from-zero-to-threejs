import { Slide, SlideBody, SlideText, type SlideProps } from '@components'
import { WebGLLogo } from '@components/models'
import { Billboard, Center, Float } from '@react-three/drei'
import { useOverlay } from '@stores'
import { useEffect } from 'react'

export function WebGL(props: SlideProps) {
  const setLogo = useOverlay(s => s.setLogo)

  useEffect(() => {
    setLogo({ position: [-2, 0, 0], scale: 0.5 })
  }, [setLogo])

  return (
    <Slide background={false} {...props}>
      <SlideBody color="white" fontSize={0.3} anchorX="center" position={[3.8, 0, 2.6]}>
        <SlideText>Three.js is a JavaScript library that simplifies creating</SlideText>
        <SlideText>and rendering 3D graphics in the browser using WebGL</SlideText>
      </SlideBody>

      <Billboard position-x={2}>
        <Float speed={1.5}>
          <Center scale={2}>
            <WebGLLogo />
          </Center>
        </Float>
      </Billboard>
    </Slide>
  )
}
