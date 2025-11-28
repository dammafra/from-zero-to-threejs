import { DemoFrame } from '@components'
import { useSpring } from '@react-spring/three'
import { MathUtils } from 'three'
import type { OverlayProps } from './Overlay'

export function OverlayDemo({ index }: OverlayProps) {
  const demoIndex = 6
  const targetIndex = index - demoIndex

  const demoSpring = useSpring({
    position: index < demoIndex ? [20, 0, 0] : [2, 1.5, 1],
    scale: index < demoIndex ? 0.001 : 1,
    rotation: [0, MathUtils.degToRad(targetIndex * 360), 0],
  })

  const demoSrcs = [
    '/demo/0-blank/index.html',
    '/demo/1-first-scene/index.html',
    '/demo/2-resizing/index.html',
    '/demo/3-animating/index.html',
    '/demo/4-camera-and-controls/index.html',
    '/demo/5-player/index.html',
    '/demo/6-grid/index.html',
    '/demo/7-lights-and-materials/index.html',
    '/demo/8-shadows/index.html',
    '/demo/9-player-animation/index.html',
    '/demo/10-grid-animation/index.html',
  ]

  return (
    index >= demoIndex - 1 && (
      // @ts-expect-error spring typings
      <DemoFrame src={demoSrcs.at(targetIndex)!} {...demoSpring} />
    )
  )
}
