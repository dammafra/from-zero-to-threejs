import { Slide, SlideBody, SlideText, type SlideProps } from '@components'
import { useIsTouch } from '@hooks'
import { useOverlay } from '@stores'
import { useEffect } from 'react'

export function Character(props: SlideProps) {
  const isTouch = useIsTouch()
  const setDemo = useOverlay(s => s.setDemo)

  useEffect(() => setDemo('5-character'), [setDemo])

  return (
    <Slide title="Character" {...props}>
      <SlideBody fontSize={0.25}>
        <SlideText>Stylized character:</SlideText>
        <SlideText bullet>Cube for the body</SlideText>
        <SlideText bullet>Truncated cone for the feet</SlideText>
        <SlideText bullet>Rectangular eyes</SlideText>
        <SlideText> </SlideText>
        <SlideText>We will use transformations:</SlideText>
        <SlideText bullet bold>
          Position
        </SlideText>
        <SlideText bullet bold>
          Scale
        </SlideText>
        <SlideText bullet bold>
          Rotation
        </SlideText>
      </SlideBody>

      <SlideBody fontSize={0.15} position={[isTouch ? 2.9 : 2.4, 0, 3]}>
        <SlideText>{`${isTouch ? 'Tap' : 'Double click'} to see the code 👉`}</SlideText>
      </SlideBody>
    </Slide>
  )
}
