import { Slide, type SlideProps } from '@components/Slide'
import { SlideBody, SlideText } from '@components/SlideBody'
import { useOverlay } from '@stores'
import { useEffect } from 'react'

export function Character(props: SlideProps) {
  const setDemo = useOverlay(s => s.setDemo)

  useEffect(() => setDemo('4-camera-and-controls'), [setDemo])

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
    </Slide>
  )
}
