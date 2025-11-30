import { Slide, type SlideProps } from '@components/Slide'
import { SlideBody, SlideText } from '@components/SlideBody'
import { useOverlay } from '@stores'
import { useEffect } from 'react'

export function Light2(props: SlideProps) {
  const setDemo = useOverlay(s => s.setDemo)
  useEffect(() => setDemo('6-grid'), [])

  return (
    <Slide title="Light e Material" {...props}>
      <SlideBody bullet fontSize={0.28}>
        <SlideText>Utilizzare MeshStandardMaterial</SlideText>
        <SlideText>Aggiungere DirectionalLight</SlideText>
        <SlideText>Aggiungere AmbientLight</SlideText>
      </SlideBody>
    </Slide>
  )
}
