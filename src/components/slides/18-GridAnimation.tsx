import { DemoHint, Slide, SlideBody, SlideText, type SlideProps } from '@components'
import { useOverlay } from '@stores'
import { useEffect } from 'react'

export function GridAnimation(props: SlideProps) {
  const setDemo = useOverlay(s => s.setDemo)

  useEffect(() => setDemo('10-grid-animation'), [setDemo])

  return (
    <Slide title="Grid Animation" {...props}>
      <SlideBody fontSize={0.3}>
        <SlideText bullet>Every 5 seconds a tile must</SlideText>
        <SlideText anchorX={-0.2}>disappear and then reappear</SlideText>
        <SlideText bullet>Before disappearing it must</SlideText>
        <SlideText anchorX={-0.2}>change color like a traffic light</SlideText>
      </SlideBody>

      <DemoHint />
    </Slide>
  )
}
