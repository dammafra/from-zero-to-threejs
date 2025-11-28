import { Slide, type SlideProps } from '@components'
import { Avatar } from '@components/models'
import { Text } from '@react-three/drei'
import { MathUtils } from 'three'

export function AboutMe(props: SlideProps) {
  return (
    <Slide title="Francesco Dammacco" {...props}>
      <Avatar position={[2, 0.02, 1]} scale={1.5} />
      {/* TODO: component that already rotates and apply scale + transform */}
      <group position={[-3.8, 0, -0.5]}>
        <Text rotation-x={MathUtils.degToRad(-90)} fontSize={0.4} color="black" anchorX={0}>
          •
        </Text>
        <Text
          position-z={0.5}
          rotation-x={MathUtils.degToRad(-90)}
          fontSize={0.4}
          color="black"
          anchorX={0}
        >
          •
        </Text>
        <Text
          position-z={1}
          rotation-x={MathUtils.degToRad(-90)}
          fontSize={0.4}
          color="black"
          anchorX={0}
        >
          •
        </Text>
        <Text
          rotation-x={MathUtils.degToRad(-90)}
          fontSize={0.4}
          color="black"
          fontWeight="bold"
          anchorX={-0.2}
        >
          Senior Full Stack Engineer
        </Text>
        <Text
          position-z={0.5}
          rotation-x={MathUtils.degToRad(-90)}
          fontSize={0.4}
          color="black"
          anchorX={-0.2}
        >
          Alle prese col web dal 2017
        </Text>
        <Text
          position-z={1}
          rotation-x={MathUtils.degToRad(-90)}
          fontSize={0.4}
          color="black"
          anchorX={-0.2}
        >
          Alle prese col 3D dal 2024
        </Text>
      </group>
    </Slide>
  )
}
