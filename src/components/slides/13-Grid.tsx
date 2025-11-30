import { Slide, SlideBody, SlideText, type SlideProps } from '@components'
import { useIsTouch } from '@hooks'
import { useOverlay } from '@stores'
import { useEffect } from 'react'

export function Grid(props: SlideProps) {
  const isTouch = useIsTouch()
  const setDemo = useOverlay(s => s.setDemo)

  useEffect(() => setDemo('6-grid'), [setDemo])

  return (
    <Slide title="Grid" {...props}>
      <SlideBody>
        <SlideText>Rectangular floor:</SlideText>
        <SlideText bullet>Squared tiles</SlideText>
        <SlideText bullet>8x6 dimension</SlideText>
      </SlideBody>

      <SlideBody fontSize={0.15} position={[isTouch ? 2.9 : 2.4, 0, 3]}>
        <SlideText>{`${isTouch ? 'Tap' : 'Double click'} to see the code 👉`}</SlideText>
      </SlideBody>
    </Slide>
  )
}
