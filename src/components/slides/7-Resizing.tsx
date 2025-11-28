import { Ruler } from '@components/models'
import { Slide, type SlideProps } from '@components/Slide'
import { Billboard, Float } from '@react-three/drei'
import { MathUtils } from 'three'

export function Resizing(props: SlideProps) {
  return (
    <Slide title="Resizing" {...props}>
      <Billboard position={[-2.5, 1.3, 0.9]}>
        <Float>
          <Ruler scale={0.15} rotation={[MathUtils.degToRad(-90), MathUtils.degToRad(75), 0]} />
        </Float>
      </Billboard>
    </Slide>
  )
}
