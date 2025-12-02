import { ThreeLogo } from '@components/models'
import { animated, useSpring } from '@react-spring/three'
import { Billboard, Center, Float, type BillboardProps } from '@react-three/drei'
import { useOverlay } from '@stores'

const AnimatedLogo = animated(({ rotation, ...props }: BillboardProps) => {
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

export function OverlayLogo() {
  const { visible, position, rotation, scale } = useOverlay(s => s.logo)

  const spring = useSpring({
    position,
    rotation,
    scale,
  })

  // @ts-expect-error spring typings
  return visible && <AnimatedLogo {...spring} />
}
