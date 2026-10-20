import { Frame, FrameLoader, type FrameProps } from '@components'
import { useIsTouch } from '@hooks'
import { useSpring as useSpringThree } from '@react-spring/three'
import { useOverlay } from '@stores'
import { useState } from 'react'
import { MathUtils } from 'three'
import { useLocation } from 'wouter'

export function DemoFrame(props: FrameProps) {
  const isTouch = useIsTouch()
  const demo = useOverlay(s => s.demo)

  const [prevDemo, setPrevDemo] = useState<typeof demo>()
  const [src, setSrc] = useState<string>()
  const [rotationY, setRotationY] = useState(0)
  const [, navigate] = useLocation()

  if (demo !== prevDemo) {
    setPrevDemo(demo)
    if (demo) {
      setSrc(`/demo/${demo}/index.html`)
      setRotationY(r => r + 360)
    }
  }

  const spring = useSpringThree({
    position: demo ? [2.2, 1.5, 1] : [20, 0, 0],
    scale: demo ? 1 : 0.001,
    rotation: [0, MathUtils.degToRad(rotationY), 0],
  })

  return (
    // @ts-expect-error spring typings
    <Frame
      transition
      onDoubleClick={() => src && navigate(`/demo/${encodeURIComponent(src)}`)}
      onClick={() => isTouch && src && navigate(`/demo/${encodeURIComponent(src)}`)}
      {...props}
      {...spring}
    >
      <FrameLoader as="iframe" key={src} src={src} className="pointer-events-none size-full" />
    </Frame>
  )
}
