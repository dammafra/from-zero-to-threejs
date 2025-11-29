import { Clock } from '@components/models'
import { Slide, type SlideProps } from '@components/Slide'
import { SlideBody, SlideText } from '@components/SlideBody'
import { MathUtils } from 'three'

export function Animating(props: SlideProps) {
  return (
    <Slide title="Animating" {...props}>
      <SlideBody fontSize={0.3}>
        <SlideText>Per animare bisogna renderizzare</SlideText>
        <SlideText>la scena a ogni frame</SlideText>
      </SlideBody>

      <SlideBody fontSize={0.3} position={[1.62, 0, 1.2]}>
        <SlideText bold>Tempo o delta</SlideText>
        <SlideText>rendono le animazioni</SlideText>
        <SlideText>costanti su ogni</SlideText>
        <SlideText>framerate</SlideText>
      </SlideBody>

      <Clock position={[-3, 0.1, 1.5]} rotation-x={MathUtils.degToRad(-90)} />
    </Slide>
  )
}
