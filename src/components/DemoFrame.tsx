import { Frame, type FrameProps } from '@components'
import { animated } from '@react-spring/three'
import { a, useSpring } from '@react-spring/web'
import { useState } from 'react'
import { useLocation, useRoute } from 'wouter'

interface DemoFrameProps extends FrameProps {
  src: string
}

function _DemoFrame({ src, ...props }: DemoFrameProps) {
  const [, navigate] = useLocation()
  const [, params] = useRoute('/slides/:index')

  const [loaded, setLoaded] = useState(false)
  const springs = useSpring({ opacity: loaded ? 1 : 0 })

  return (
    <Frame
      onDoubleClick={() => {
        localStorage.setItem('demo:last-slide-index', params!.index)
        navigate(`/demo/${encodeURIComponent(src)}`)
      }}
      {...props}
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

export const DemoFrame = animated(_DemoFrame)
