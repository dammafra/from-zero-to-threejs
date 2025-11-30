import { Slide, SlideBody, SlideText, type SlideProps } from '@components'
import { Ruler } from '@components/models'
import { useSpring } from '@react-spring/three'
import { useOverlay } from '@stores'
import { useEffect } from 'react'
import { MathUtils } from 'three'

export function Resizing(props: SlideProps) {
  const setLogo = useOverlay(s => s.setLogo)
  const setDemo = useOverlay(s => s.setDemo)

  const [, api] = useSpring(() => ({
    from: { scale: 0.2 },
    to: { scale: 0.3 },
    loop: { reverse: true },
    config: { tension: 30, friction: 10 },
    onChange: ({ value, cancelled }) => !cancelled && setLogo({ scale: value.scale }),
  }))

  useEffect(() => {
    setLogo({ position: [-2.5, 0.8, 1.5] })
    setDemo('1-first-scene')

    api.start()
    return () => {
      api.stop()
      setLogo({ scale: 0.2 })
    }
  }, [setLogo, setDemo, api])

  return (
    <Slide title="Resizing" {...props}>
      <SlideBody bullet>
        <SlideText>Fullscreen canvas</SlideText>
        <SlideText>Responsive canvas:</SlideText>
      </SlideBody>

      <SlideBody bullet position={[0.5, 0, 0.9]}>
        <SlideText>Update the camera</SlideText>
        <SlideText>Update the renderer</SlideText>
      </SlideBody>

      <Ruler
        position={[-3.3, 0.1, 1]}
        scale={[0.13, 0.15, 0.15]}
        rotation={[0, MathUtils.degToRad(-75), 0]}
      />
    </Slide>
  )
}
