import { Frame, type FrameProps } from '@components'
import { useIsTouch } from '@hooks'
import { useSpring as useSpringThree } from '@react-spring/three'
import { a, useSpring as useSpringWeb } from '@react-spring/web'
import { useOverlay } from '@stores'
import { useEffect, useState } from 'react'
import { MathUtils } from 'three'
import { useLocation } from 'wouter'

export function DemoFrame(props: FrameProps) {
  const isTouch = useIsTouch()
  const demo = useOverlay(s => s.demo)

  const [src, setSrc] = useState<string>()
  const [rotationY, setRotationY] = useState(0)
  const [, navigate] = useLocation()

  useEffect(() => {
    setSrc(demo ? `/demo/${demo}/index.html` : undefined)
    setRotationY(r => r + 360)
  }, [demo])

  const demoSpring = useSpringThree({
    position: demo ? [2.2, 1.5, 1] : [20, 0, 0],
    scale: demo ? 1 : 0.001,
    rotation: [0, MathUtils.degToRad(rotationY), 0],
  })

  const [loaded, setLoaded] = useState(false)
  const springs = useSpringWeb({ opacity: loaded ? 1 : 0 })

  return (
    // @ts-expect-error spring typings
    <Frame
      onDoubleClick={() => src && navigate(`/demo/${encodeURIComponent(src)}`)}
      onClick={() => isTouch && src && navigate(`/demo/${encodeURIComponent(src)}`)}
      {...props}
      {...demoSpring}
    >
      <a.iframe
        className=" h-full w-full pointer-events-none "
        src={src}
        onLoad={() => setLoaded(true)}
        style={springs}
      />
    </Frame>
  )
}
