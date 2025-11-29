import { Slide, type SlideProps } from '@components/Slide'
import { SlideBody, SlideText } from '@components/SlideBody'

export function Player(props: SlideProps) {
  return (
    <Slide title="Player" {...props}>
      <SlideBody fontSize={0.25}>
        <SlideText>Personaggio stilizzato:</SlideText>
        <SlideText bullet>Cubo per il corpo</SlideText>
        <SlideText bullet>Tronco di cono per i piedi</SlideText>
        <SlideText bullet>Occhi rettangolari</SlideText>
        <SlideText> </SlideText>
        <SlideText>Per farlo utilizzeremo le trasformazioni:</SlideText>
        <SlideText bullet bold>
          Position
        </SlideText>
        <SlideText bullet bold>
          Scale
        </SlideText>
        <SlideText bullet bold>
          Rotation
        </SlideText>
      </SlideBody>
    </Slide>
  )
}
