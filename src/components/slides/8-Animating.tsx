import { Clock } from '@components/models'
import { Slide, type SlideProps } from '@components/Slide'
import { MathUtils } from 'three'

export function Animating(props: SlideProps) {
  return (
    <Slide title="Animating" {...props}>
      <Clock position={[-3, 0.1, 1.5]} rotation-x={MathUtils.degToRad(-90)} />
    </Slide>
  )
}
