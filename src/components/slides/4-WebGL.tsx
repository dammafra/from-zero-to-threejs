import { Slide, SlideBody, SlideText, type SlideProps } from '@components'
import { WebGLLogo } from '@components/models'
import { animated } from '@react-spring/three'
import { useSpring } from '@react-spring/web'
import { Billboard, Center, Float } from '@react-three/drei'
import { useOverlay } from '@stores'
import { useEffect } from 'react'
import type { Vector3Tuple } from 'three'

const AnimatedBillboard = animated(Billboard)

export function WebGL(props: SlideProps) {
  const setLogo = useOverlay(s => s.setLogo)

  useEffect(() => {
    setLogo({ position: [-2, 0, 0], scale: 0.5 })
  }, [setLogo])

  const spring = useSpring({
    from: { position: [20, 0, 0] as Vector3Tuple },
    to: { position: [2, 0, 0] as Vector3Tuple },
  })

  return (
    <Slide background={false} {...props}>
      <SlideBody color="white" fontSize={0.3} anchorX="center" position={[3.8, 0, 2.6]}>
        <SlideText>Three.js is a JavaScript library that simplifies creating</SlideText>
        <SlideText>and rendering 3D graphics in the browser using WebGL</SlideText>
      </SlideBody>

      <AnimatedBillboard position={spring.position}>
        <Float speed={1.5}>
          <Center scale={2}>
            <WebGLLogo />
          </Center>
        </Float>
      </AnimatedBillboard>
    </Slide>
  )
}
