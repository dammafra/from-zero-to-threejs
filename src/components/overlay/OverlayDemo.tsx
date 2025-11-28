import { DemoFrame } from '@components'
import { useSpring } from '@react-spring/three'
import { MathUtils } from 'three'
import type { OverlayProps } from './Overlay'

export function OverlayDemo({ index }: OverlayProps) {
  const demoIndex = 6
  const demoSpring = useSpring({
    positionX: index >= demoIndex ? 2 : 20,
    scale: index < demoIndex ? 0.01 : 1,
    rotation: [0, MathUtils.degToRad((index - demoIndex) * 360), 0],
  })

  const demoSrcs = ['/demo/1-first-scene/index.html', '/demo/10-grid-animation/index.html']

  return (
    index >= demoIndex - 1 && (
      // @ts-expect-error spring typings
      <DemoFrame
        src={demoSrcs.at(index - demoIndex)!}
        position={[0, 1.5, 1]}
        position-x={demoSpring.positionX}
        {...demoSpring}
      />
    )
  )
}
