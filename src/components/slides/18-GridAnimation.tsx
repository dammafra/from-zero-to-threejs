import { Slide, SlideBody, SlideText, type SlideProps } from '@components'
import { useIsTouch } from '@hooks'
import { useOverlay } from '@stores'
import { useEffect } from 'react'

export function GridAnimation(props: SlideProps) {
  const isTouch = useIsTouch()
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

      <SlideBody fontSize={0.15} position={[isTouch ? 2.9 : 2.4, 0, 3]}>
        <SlideText>{`${isTouch ? 'Tap' : 'Double click'} to see the code 👉`}</SlideText>
      </SlideBody>
    </Slide>
  )
}
