import { Slide, SlideBody, SlideText, type SlideProps } from '@components'
import { useIsTouch } from '@hooks'
import { useOverlay } from '@stores'
import { useEffect } from 'react'

export function Shadows(props: SlideProps) {
  const isTouch = useIsTouch()
  const setDemo = useOverlay(s => s.setDemo)

  useEffect(() => setDemo('8-shadows'), [setDemo])

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

      <SlideBody fontSize={0.15} position={[isTouch ? 2.9 : 2.4, 0, 3]}>
        <SlideText>{`${isTouch ? 'Tap' : 'Double click'} to see the code 👉`}</SlideText>
      </SlideBody>
    </Slide>
  )
}
