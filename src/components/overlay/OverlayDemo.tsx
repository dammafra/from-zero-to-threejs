import { DemoFrame } from '@components'
import { useSpring } from '@react-spring/three'
import type { OverlayProps } from './Overlay'

export function OverlayDemo({ index }: OverlayProps) {
  const demoIndex = 6
  const demoSpring = useSpring({
    positionX: index === demoIndex ? 2 : 20,
    scale: index < demoIndex ? 0.01 : 1,
  })

  return (
    [demoIndex - 1, demoIndex].includes(index) && (
      <DemoFrame
        src="/demo/10-grid-animation/index.html"
        position={[0, 1.5, 1]}
        position-x={demoSpring.positionX}
        {...demoSpring}
      />
    )
  )
}
