import { Target } from '@components/models'
import { Slide, type SlideProps } from '@components/Slide'
import { SlideBody, SlideText } from '@components/SlideBody'
import { MathUtils } from 'three'

export function Goal(props: SlideProps) {
  return (
    <Slide title="Obiettivo" {...props}>
      <Target scale={3.5} position={[3, 0, -0.5]} rotation-y={MathUtils.degToRad(-45)} />
      <SlideBody>
        <SlideText>Creare le basi per un mini videogioco:</SlideText>
        <SlideText bullet bold>
          Personaggio
        </SlideText>
        <SlideText anchorX={-0.25}>con animazione del movimento</SlideText>
        <SlideText bullet bold>
          Ambientazione
        </SlideText>
        <SlideText anchorX={-0.25}>griglia con mattonelle che</SlideText>
        <SlideText anchorX={-0.25}>scompaiono</SlideText>
      </SlideBody>
    </Slide>
  )
}
