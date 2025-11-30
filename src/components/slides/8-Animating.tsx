import { Clock } from '@components/models'
import { Slide, type SlideProps } from '@components/Slide'
import { SlideBody, SlideText } from '@components/SlideBody'
import { useSpring } from '@react-spring/three'
import { useOverlay } from '@stores'
import { useEffect, useState } from 'react'
import { MathUtils } from 'three'

export function Animating(props: SlideProps) {
  const setLogo = useOverlay(s => s.setLogo)
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
    setLogo({ position: [-3, 1, 1], scale: 0.3 })
    api.start()

    return () => {
      api.stop()
      setLogo({ rotation: [0, 0, 0] })
    }
  }, [setLogo])

  return (
    <Slide title="Animating" {...props}>
      <SlideBody fontSize={0.3}>
        <SlideText>Per animare bisogna renderizzare</SlideText>
        <SlideText>la scena a ogni frame</SlideText>
      </SlideBody>

      <SlideBody fontSize={0.3} position={[1.5, 0, 1.2]}>
        <SlideText bold>Tempo o delta</SlideText>
        <SlideText>rendono le animazioni</SlideText>
        <SlideText>costanti su ogni</SlideText>
        <SlideText>framerate</SlideText>
      </SlideBody>

      <Clock position={[-3, 0.1, 1.5]} rotation-x={MathUtils.degToRad(-90)} />
    </Slide>
  )
}
