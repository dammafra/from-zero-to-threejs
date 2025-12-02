import { Frame, FrameLoader, Slide, type SlideProps } from '@components'
import { useIsTouch } from '@hooks'
import { useOverlay } from '@stores'
import { useEffect } from 'react'

export function End(props: SlideProps) {
  const isTouch = useIsTouch()
  const setLogo = useOverlay(s => s.setLogo)
  const setDemo = useOverlay(s => s.setDemo)

  useEffect(() => {
    setLogo({ visible: false })
    setDemo('10-grid-animation')
  }, [setLogo, setDemo])

  return (
    <Slide title="The End... ?" {...props}>
      <Frame
        position={[-1.5, 1.5, 1.3]}
        scale={1.1}
        onDoubleClick={() => window.location.assign('https://linktr.ee/dammafra')}
        onClick={() => isTouch && window.location.assign('https://linktr.ee/dammafra')}
      >
        <FrameLoader src="/images/linktree.png" className="size-full object-cover" />
      </Frame>
    </Slide>
  )
}
