import { ThreeLogo, WebGLLogo } from '@components/models'
import { animated, useSpring } from '@react-spring/three'
import { Billboard, Center, Float, type BillboardProps } from '@react-three/drei'
import { MathUtils } from 'three'
import type { OverlayProps } from './Overlay'

export function OverlayLogo({ index }: OverlayProps) {
  const threeLogoSpring = useSpring({
    position: [
      [0.01, 2.5, -2.1, -2, 2].at(index) || 20,
      [-1, 1.3, 1, 1.3].at(index) || 0,
      [0, 1.25, 0.25, 1.25].at(index) || 0,
    ],
    scale: [1, 0.4, 0.25, 0.1, 0.5, 0.01].at(index) || 1,
    rotation: [0, MathUtils.degToRad([0, 0, -360, -360, -360].at(index) || 0), 0],
  })

  const webGLLogoSpring = useSpring({
    position: [index === 4 ? -2 : -20, 0, 0],
    scale: index === 4 ? 1 : 0,
  })

  return (
    index < 6 && (
      <>
        {/* @ts-expect-error spring typings */}
        <OverlayThreeLogo {...threeLogoSpring} />
        {/* @ts-expect-error spring typings */}
        <OverlayWebGLLogo {...webGLLogoSpring} />
      </>
    )
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
