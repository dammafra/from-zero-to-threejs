import { Ruler } from '@components/models'
import { Slide, type SlideProps } from '@components/Slide'
import { MathUtils } from 'three'

export function Resizing(props: SlideProps) {
  return (
    <Slide title="Resizing" {...props}>
      <Ruler position={[-3.3, 0.1, 0.8]} scale={0.15} rotation={[0, MathUtils.degToRad(-75), 0]} />
    </Slide>
  )
}
