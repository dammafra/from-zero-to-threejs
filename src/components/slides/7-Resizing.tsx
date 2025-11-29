import { Ruler } from '@components/models'
import { Slide, type SlideProps } from '@components/Slide'
import { SlideBody, SlideText } from '@components/SlideBody'
import { MathUtils } from 'three'

export function Resizing(props: SlideProps) {
  return (
    <Slide title="Resizing" {...props}>
      <SlideBody bullet>
        <SlideText>Canvas fullscreen</SlideText>
        <SlideText>Canvas responsive:</SlideText>
      </SlideBody>

      <SlideBody bullet position={[0.5, 0, 0.9]}>
        <SlideText>Aggiornare Camera</SlideText>
        <SlideText>Aggiornare Renderer</SlideText>
      </SlideBody>

      <Ruler
        position={[-3.3, 0.1, 1]}
        scale={[0.13, 0.15, 0.15]}
        rotation={[0, MathUtils.degToRad(-75), 0]}
      />
    </Slide>
  )
}
