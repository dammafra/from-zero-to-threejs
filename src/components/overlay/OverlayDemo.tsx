import { DemoFrame } from '@components'
import { useSpring } from '@react-spring/three'
import { MathUtils } from 'three'
import type { OverlayProps } from './Overlay'

export function OverlayDemo({ index }: OverlayProps) {
  const demoIndex = 6

  const demoSrcs: Record<number, string> = {
    6: '/demo/0-blank/index.html',
    7: '/demo/1-first-scene/index.html',
    8: '/demo/2-resizing/index.html',
    10: '/demo/3-animating/index.html',
    12: '/demo/4-camera-and-controls/index.html',
    13: '/demo/5-player/index.html',
    15: '/demo/6-grid/index.html',
    16: '/demo/7-lights-and-materials/index.html',
    17: '/demo/8-shadows/index.html',
    18: '/demo/9-player-animation/index.html',
    19: '/demo/10-grid-animation/index.html',
  }

  const demoIndexes = Object.keys(demoSrcs).map(Number)

  const demoSpring = useSpring({
    position: demoIndexes.includes(index) ? [2, 1.5, 1] : [20, 0, 0],
    scale: demoIndexes.includes(index) ? 1 : 0.001,
    rotation: [0, MathUtils.degToRad(index * 360), 0],
  })

  return (
    index >= demoIndex - 1 && (
      // @ts-expect-error spring typings
      <DemoFrame src={demoSrcs[index]!} {...demoSpring} />
    )
  )
}
