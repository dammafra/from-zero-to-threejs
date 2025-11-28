import { ThreeLogo, WebGLLogo } from '@components/models'
import { animated, useSpring } from '@react-spring/three'
import { Billboard, Center, Float, type BillboardProps } from '@react-three/drei'
import { MathUtils, type EulerTuple, type Vector3Tuple } from 'three'
import type { OverlayProps } from './Overlay'

export function OverlayLogo({ index }: OverlayProps) {
  const positionMap: Record<number, Vector3Tuple> = {
    0: [0.001, -1, 0],
    1: [2.5, 1.3, 1.25],
    2: [-2.1, 1, 0.25],
    3: [-0.1, 1.7, 1.3],
    4: [-2, 0, 0],
    5: [-20, 0, 20],
    6: [-1.5, 0.5, 0.3],
    7: [-1.2, 1.3, 0.9],
  } as const

  const rotationMap: Record<number, EulerTuple> = {
    0: [0, MathUtils.degToRad(0), 0],
    1: [0, MathUtils.degToRad(0), 0],
    2: [0, MathUtils.degToRad(-360), 0],
    3: [0, MathUtils.degToRad(-360), 0],
    4: [0, MathUtils.degToRad(-360), 0],
  }

  const scaleMap: Record<number, number> = {
    0: 1,
    1: 0.4,
    2: 0.25,
    3: 0.1,
    4: 0.5,
    5: 0.001,
    6: 0.2,
    7: 0.4,
  }

  const threeLogoSpring = useSpring({
    position: positionMap[index] ?? [0, 0, 0],
    rotation: rotationMap[index] ?? [0, 0, 0],
    scale: scaleMap[index] ?? 1,
  })

  const threeLogoResizingSpring = useSpring({
    from: { scale: 0.4 },
    to: [{ scale: 0.5 }, { scale: 0.4 }],
    loop: true,
    config: { tension: 30, friction: 10 },
  })

  const webGLLogoSpring = useSpring({
    position: [index === 4 ? 2 : 20, 0, index === 4 ? 0 : 20],
    scale: index === 4 ? 1 : 0,
  })

  return (
    <>
      {/* @ts-expect-error spring typings */}
      <OverlayThreeLogo
        {...threeLogoSpring}
        scale={index === 7 ? threeLogoResizingSpring.scale : threeLogoSpring.scale}
      />

      {/* @ts-expect-error spring typings */}
      {index > 2 && index < 6 && <OverlayWebGLLogo {...webGLLogoSpring} />}
    </>
  )
}

const OverlayThreeLogo = animated(({ rotation, ...props }: BillboardProps) => {
  return (
    <Billboard {...props}>
      <Float rotation={rotation}>
        <Center scale={0.05}>
          <ThreeLogo />
        </Center>
      </Float>
    </Billboard>
  )
})

const OverlayWebGLLogo = animated(({ rotation, ...props }: BillboardProps) => {
  return (
    <Billboard {...props}>
      <Float speed={1.5} rotation={rotation}>
        <Center scale={2}>
          <WebGLLogo />
        </Center>
      </Float>
    </Billboard>
  )
})
