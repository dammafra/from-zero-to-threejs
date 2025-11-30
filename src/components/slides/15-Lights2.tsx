import { Slide, SlideBody, SlideText, type SlideProps } from '@components'
import { useIsTouch } from '@hooks'
import { useOverlay } from '@stores'
import { useEffect } from 'react'

export function Lights2(props: SlideProps) {
  const isTouch = useIsTouch()
  const setDemo = useOverlay(s => s.setDemo)

  useEffect(() => setDemo('7-lights-and-materials'), [setDemo])

  return (
    <Slide title="Lights and Materials" {...props}>
      <SlideBody bullet fontSize={0.28}>
        <SlideText>Use MeshStandardMaterial</SlideText>
        <SlideText>Add DirectionalLight</SlideText>
        <SlideText>Add AmbientLight</SlideText>
      </SlideBody>

      <SlideBody fontSize={0.15} position={[isTouch ? 2.9 : 2.4, 0, 3]}>
        <SlideText>{`${isTouch ? 'Tap' : 'Double click'} to see the code 👉`}</SlideText>
      </SlideBody>
    </Slide>
  )
}
