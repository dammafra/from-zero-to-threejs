import { Slide, type SlideProps } from '@components/Slide'
import { SlideBody, SlideText } from '@components/SlideBody'
import { useOverlay } from '@stores'
import { useEffect } from 'react'

export function Shadow(props: SlideProps) {
  const setDemo = useOverlay(s => s.setDemo)
  useEffect(() => setDemo('7-lights-and-materials'), [])

  return (
    <Slide title="Shadow" {...props}>
      <SlideBody fontSize={0.28}>
        <SlideText bullet>Abilitare le ombre nel Renderer</SlideText>
        <SlideText bullet>Specificare quali luci</SlideText>
        <SlideText anchorX={-0.18}>proiettano ombre</SlideText>
        <SlideText bullet>Specificare quali oggetti</SlideText>
        <SlideText anchorX={-0.18}>proiettano ombre</SlideText>
        <SlideText bullet>Specificare quali oggetti</SlideText>
        <SlideText anchorX={-0.18}>ricevono ombre</SlideText>
      </SlideBody>
    </Slide>
  )
}
