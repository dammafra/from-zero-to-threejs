import { Slide, type SlideProps } from '@components/Slide'
import { SlideBody, SlideText } from '@components/SlideBody'
import { useOverlay } from '@stores'
import { useEffect } from 'react'

export function Grid(props: SlideProps) {
  const setDemo = useOverlay(s => s.setDemo)

  useEffect(() => setDemo('5-character'), [setDemo])

  return (
    <Slide title="Grid" {...props}>
      <SlideBody>
        <SlideText>Rectangular floor:</SlideText>
        <SlideText bullet>Squared tiles</SlideText>
        <SlideText bullet>8x6 dimension</SlideText>
      </SlideBody>
    </Slide>
  )
}
