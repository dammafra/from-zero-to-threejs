import { Slide, SlideBody, SlideText, type SlideProps } from '@components'
import {
  Avatar,
  Books,
  Chair,
  Console,
  Desk,
  Guitar,
  Headphones,
  Macbook,
  Popcorn,
} from '@components/models'
import { a, useSpring } from '@react-spring/three'
import { useOverlay } from '@stores'
import { useEffect, useMemo } from 'react'
import { MathUtils, Vector3, type Vector3Tuple } from 'three'

export function AboutMe(props: SlideProps) {
  const setLogo = useOverlay(s => s.setLogo)

  useEffect(() => {
    setLogo({ position: [-0.1, 1.7, 1], scale: 0.1 })
  }, [setLogo])

  const distance = 6
  const direction = -1
  const rotationY = MathUtils.degToRad(-45)
  const endPosition = useMemo(() => [2, 0.02, 1.3], [])
  const startPosition = useMemo(() => {
    const dir = new Vector3(Math.cos(rotationY), 0, Math.sin(rotationY)).multiplyScalar(
      distance * direction,
    )
    return new Vector3().fromArray(endPosition).sub(dir).toArray()
  }, [distance, direction, rotationY, endPosition])

  const spring = useSpring({
    from: { position: startPosition as Vector3Tuple },
    to: { position: endPosition as Vector3Tuple },
    config: { duration: 2500 },
    delay: 500,
  })

  return (
    <Slide title="dammafra" titlePosition={[0.3, 0.02, -1.5]} {...props}>
      <SlideBody position={[4.05, 0, -0.1]} fontSize={0.3}>
        <SlideText
          bold
          color="dodgerblue"
          onClick={() => window.open('https://linktr.ee/dammafra')}
        >
          linktr.ee/dammafra
        </SlideText>
      </SlideBody>

      <a.group position={spring.position} rotation-y={rotationY} scale={1.5}>
        <Avatar />
      </a.group>

      <group position-z={-0.3}>
        <Desk scale={1.5} position={[-1.5, 0, 0.6]} rotation-y={MathUtils.degToRad(-70)} />
        <Chair scale={0.045} position={[-1.25, 0, 1.45]} rotation-y={MathUtils.degToRad(-170)} />
        <Macbook scale={0.3} position={[-1.5, 1.4, 0.6]} rotation-y={MathUtils.degToRad(25)} />
        <Console scale={0.08} position={[-2.5, 1.4, 0.6]} rotation-y={MathUtils.degToRad(60)} />
        <Books scale={0.025} position={[-0.4, 1.4, 0.6]} rotation-y={MathUtils.degToRad(170)} />
        <Headphones scale={0.4} position={[-2.2, 1.4, 1.2]} />
        <Popcorn scale={0.35} position={[-0.6, 1.4, 0]} />
        <Guitar
          scale={0.8}
          position={[-3.3, 0, 2]}
          rotation={[MathUtils.degToRad(-30), MathUtils.degToRad(-20), MathUtils.degToRad(-20)]}
        />
      </group>
    </Slide>
  )
}
