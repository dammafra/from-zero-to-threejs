import { Slide, SlideBody, SlideText, type SlideProps } from '@components'
import { Clock } from '@components/models'
import { useSpring } from '@react-spring/three'
import { useOverlay } from '@stores'
import { useEffect, useState } from 'react'
import { MathUtils } from 'three'

export function Animating(props: SlideProps) {
  const setLogo = useOverlay(s => s.setLogo)
  const setDemo = useOverlay(s => s.setDemo)

  const [loops, setLoops] = useState(0)
  const [, api] = useSpring(
    () => ({
      rotation: [0, MathUtils.degToRad(-loops * 360), 0],
      config: { duration: 5000 },
      onChange: ({ value, cancelled }) => !cancelled && setLogo({ rotation: value.rotation }),
      onResolve: () => setLoops(loops + 1),
    }),
    [loops],
  )

  useEffect(() => {
    setLogo({ position: [-2.8, 1, 0.8], scale: 0.3 })
    setDemo('2-resizing')

    api.start()
    return () => {
      api.stop()
      setLogo({ rotation: [0, 0, 0] })
    }
  }, [setLogo, setDemo, api])

  return (
    <Slide title="Animating" {...props}>
      <SlideBody fontSize={0.3}>
        <SlideText>To animate, you must render </SlideText>
        <SlideText>the scene every frame</SlideText>
      </SlideBody>

      <SlideBody fontSize={0.3} position={[1.8, 0, 1.5]}>
        <SlideText bold>Time or delta</SlideText>
        <SlideText>keep animations</SlideText>
        <SlideText>consistent across</SlideText>
        <SlideText>any framerate</SlideText>
      </SlideBody>

      <Clock position={[-3, 0.1, 1.5]} rotation-x={MathUtils.degToRad(-90)} />
    </Slide>
  )
}
