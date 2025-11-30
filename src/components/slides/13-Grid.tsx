import { Slide, type SlideProps } from '@components/Slide'
import { SlideBody, SlideText } from '@components/SlideBody'
import { useOverlay } from '@stores'
import { useEffect } from 'react'

export function Grid(props: SlideProps) {
  const setDemo = useOverlay(s => s.setDemo)

  useEffect(() => setDemo('5-player'), [setDemo])

  return (
    <Slide title="Grid" {...props}>
      <SlideBody>
        <SlideText>Pavimento rettangolare:</SlideText>
        <SlideText bullet>Dimensione 8x6 </SlideText>
        <SlideText bullet>Mattonelle quadrate </SlideText>
      </SlideBody>
    </Slide>
  )
}
