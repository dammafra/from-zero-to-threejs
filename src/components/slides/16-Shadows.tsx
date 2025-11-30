import { Slide, type SlideProps } from '@components/Slide'
import { SlideBody, SlideText } from '@components/SlideBody'
import { useOverlay } from '@stores'
import { useEffect } from 'react'

export function Shadows(props: SlideProps) {
  const setDemo = useOverlay(s => s.setDemo)

  useEffect(() => setDemo('7-lights-and-materials'), [setDemo])

  return (
    <Slide title="Shadows" {...props}>
      <SlideBody fontSize={0.28}>
        <SlideText bullet>Enable Renderer shadows</SlideText>
        <SlideText bullet>Specify which lights</SlideText>
        <SlideText anchorX={-0.18}>cast shadows</SlideText>
        <SlideText bullet>Specify which objects</SlideText>
        <SlideText anchorX={-0.18}>cast shadows</SlideText>
        <SlideText bullet>Specify which objects</SlideText>
        <SlideText anchorX={-0.18}>receive shadows</SlideText>
      </SlideBody>
    </Slide>
  )
}
