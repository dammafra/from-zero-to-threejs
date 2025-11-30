import { Slide, type SlideProps } from '@components'
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
