import { Avatar } from '@components/models'
import Slide, { type SlideProps } from '@components/Slide'
import { Html } from '@react-three/drei'
import { MathUtils } from 'three'

export function AboutMe(props: SlideProps) {
  return (
    <Slide title="Francesco Dammacco" {...props}>
      <Avatar position={[2, 0.02, 1]} scale={1.5} />
      {/* TODO: component that already rotates and apply scale + transform */}
      <Html
        transform
        occlude
        rotation-x={MathUtils.degToRad(-90)}
        position={[-1.5, 0, 0]}
        scale={0.25}
      >
        <ul className="text-xs font-main" style={{ transform: 'scale(4)' }}>
          <li className="font-bold">Senior Full Stack Engineer</li>
          <li>Alle prese col web dal 2017</li>
          <li>Alle prese col 3D dal 2024</li>
        </ul>
      </Html>
    </Slide>
  )
}
