import { DemoHint, Slide, SlideBody, SlideText, type SlideProps } from '@components'
import { useOverlay } from '@stores'
import { useEffect } from 'react'

export function CharacterAnimation(props: SlideProps) {
  const setDemo = useOverlay(s => s.setDemo)

  useEffect(() => setDemo('9-character-animation'), [setDemo])

  return (
    <Slide title="Character Animation" {...props}>
      <SlideBody bullet>
        <SlideText>Steps animation</SlideText>
        <SlideText>Walking in a circle</SlideText>
      </SlideBody>

      <DemoHint />
    </Slide>
  )
}
