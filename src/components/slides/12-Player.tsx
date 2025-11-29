import { Slide, type SlideProps } from '@components/Slide'
import { SlideBody, SlideText } from '@components/SlideBody'

export function Player(props: SlideProps) {
  return (
    <Slide title="Player" {...props}>
      <SlideBody>
        <SlideText>Personaggio stilizzato:</SlideText>
        <SlideText bullet>Cubo per il corpo</SlideText>
        <SlideText bullet>Tronco di cono per i piedi</SlideText>
        <SlideText bullet>Occhi rettangolari</SlideText>
      </SlideBody>
    </Slide>
  )
}
