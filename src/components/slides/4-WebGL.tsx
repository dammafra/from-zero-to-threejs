import { Slide, type SlideProps } from '@components'
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
