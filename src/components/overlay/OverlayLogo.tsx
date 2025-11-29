import { Hoverable } from '@components/helpers'
import { ThreeLogo, WebGLLogo } from '@components/models'
import { animated, config, useSpring } from '@react-spring/three'
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
    6: [-0.3, 0.5, 0.5],
    7: [-2.5, 0.8, 1.5],
    8: [-3, 1, 1],
  }

  const rotationMap: Record<number, EulerTuple> = {
    0: [0, MathUtils.degToRad(0), 0],
    1: [0, MathUtils.degToRad(0), 0],
    2: [0, MathUtils.degToRad(-360), 0],
    3: [0, MathUtils.degToRad(-360), 0],
    4: [0, MathUtils.degToRad(-360), 0],
    8: [0, MathUtils.degToRad(360), 0],
  }

  const scaleMap: Record<number, number> = {
    0: 1,
    1: 0.4,
    2: 0.25,
    3: 0.1,
    4: 0.5,
    6: 0.2,
    7: 0.2,
    8: 0.3,
  }

  const threeLogoPositionSpring = useSpring({
    position: positionMap[index] ?? [-20, 0, 0],
  })

  const threeLogoRotationSpring = useSpring({
    from: { rotation: rotationMap[index - 1] ?? [0, 0, 0] },
    to: { rotation: rotationMap[index] ?? [0, 0, 0] },
    loop: index === 8,
    config: index === 8 ? { duration: 5000 } : config.default,
  })

  const threeLogoScaleSpring = useSpring({
    from: { scale: scaleMap[index - 1] ?? 0.001 },
    to: async next => {
      if (index === 7) {
        while (true) {
          await next({ scale: 0.3 })
          await next({ scale: 0.2 })
        }
      } else await next({ scale: scaleMap[index] ?? 0.001 })
    },
    config: index === 7 ? { tension: 30, friction: 10 } : config.default,
  })

  const webGLLogoSpring = useSpring({
    position: [index === 4 ? 2 : 20, 0, index === 4 ? 0 : 20],
    scale: index === 4 ? 1 : 0,
  })

  return (
    <>
      {index < 10 && (
        // @ts-expect-error spring typings
        <OverlayThreeLogo
          {...threeLogoPositionSpring}
          {...threeLogoRotationSpring}
          {...threeLogoScaleSpring}
        />
      )}

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
          <Hoverable>
            <ThreeLogo onClick={() => window.open('https://threejs.org/')} />
          </Hoverable>
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
