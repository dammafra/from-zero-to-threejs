import { Slide, SlideBody, SlideText, type SlideProps } from '@components'
import { useOverlay } from '@stores'
import { useEffect } from 'react'

export function Lights2(props: SlideProps) {
  const setDemo = useOverlay(s => s.setDemo)

  useEffect(() => setDemo('6-grid'), [setDemo])

  return (
    <Slide title="Lights and Materials" {...props}>
      <SlideBody bullet fontSize={0.28}>
        <SlideText>Use MeshStandardMaterial</SlideText>
        <SlideText>Add DirectionalLight</SlideText>
        <SlideText>Add AmbientLight</SlideText>
      </SlideBody>
    </Slide>
  )
}
