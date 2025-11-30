import { Book } from '@components/models'
import { Slide, type SlideProps } from '@components/Slide'
import { SlideBody, SlideText } from '@components/SlideBody'
import { useOverlay } from '@stores'
import { useEffect } from 'react'
import { MathUtils } from 'three'

export function Summary(props: SlideProps) {
  const setLogo = useOverlay(s => s.setLogo)

  useEffect(() => {
    setLogo({ position: [-2.1, 1, 0.25], rotation: [0, MathUtils.degToRad(-360), 0], scale: 0.25 })
  }, [setLogo])

  return (
    <Slide title="Cosa scopriremo" {...props}>
      <Book scale={2.5} position={[-2.5, 0, 0.2]} rotation-y={MathUtils.degToRad(25)} />
      <SlideBody bullet offset={3}>
        <SlideText>Setup di una scena</SlideText>
        <SlideText>Camera e Controls</SlideText>
        <SlideText>Geometry e Material</SlideText>
        <SlideText>Creazione di oggetti</SlideText>
        <SlideText>Trasformazione di oggetti</SlideText>
        <SlideText>Animazione di oggetti</SlideText>
        <SlideText>Luci e Ombre</SlideText>
      </SlideBody>
    </Slide>
  )
}
