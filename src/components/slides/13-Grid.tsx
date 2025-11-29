import { Slide, type SlideProps } from '@components/Slide'
import { SlideBody, SlideText } from '@components/SlideBody'

export function Grid(props: SlideProps) {
  return (
    <Slide title="Grid" {...props}>
      <SlideBody>
        <SlideText>Pavimento rettangolare:</SlideText>
        <SlideText bullet>Dimensione 8x6 </SlideText>
        <SlideText bullet>Mattonelle quadrate </SlideText>
      </SlideBody>
    </Slide>
  )
}
