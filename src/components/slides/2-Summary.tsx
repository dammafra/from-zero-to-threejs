import { Book } from '@components/models'
import { Slide, type SlideProps } from '@components/Slide'
import { SlideBody, SlideText } from '@components/SlideBody'
import { MathUtils } from 'three'

export function Summary(props: SlideProps) {
  return (
    <Slide title="Cosa scopriremo" {...props}>
      <Book scale={2.5} position={[-2.5, 0, 0.2]} rotation-y={MathUtils.degToRad(25)} />
      <SlideBody bullet offset={3}>
        <SlideText>Setup di una scena</SlideText>
        <SlideText>Camera e Controlli</SlideText>
        <SlideText>Creazione di oggetti</SlideText>
        <SlideText>Trasformazione di oggetti</SlideText>
        <SlideText>Animazione di oggetti</SlideText>
        <SlideText>Geometrie e Materiali</SlideText>
        <SlideText>Luci e Ombre</SlideText>
      </SlideBody>
    </Slide>
  )
}
