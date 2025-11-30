import { Frame } from '@components/Frame'
import { Slide, type SlideProps } from '@components/Slide'
import { useOverlay } from '@stores'
import { useEffect } from 'react'

export function End(props: SlideProps) {
  const setDemo = useOverlay(s => s.setDemo)

  useEffect(() => setDemo('10-grid-animation'), [setDemo])

  return (
    <Slide title="The End... ?" {...props}>
      <Frame position={[-1.5, 1.5, 1.3]} scale={1.1}>
        <img src="/images/linktree.png" className="fixed inset-0 size-full" />
      </Frame>
    </Slide>
  )
}
