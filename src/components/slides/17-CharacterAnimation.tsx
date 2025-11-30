import { Slide, type SlideProps } from '@components/Slide'
import { SlideBody, SlideText } from '@components/SlideBody'
import { useOverlay } from '@stores'
import { useEffect } from 'react'

export function CharacterAnimation(props: SlideProps) {
  const setDemo = useOverlay(s => s.setDemo)

  useEffect(() => setDemo('8-shadows'), [setDemo])

  return (
    <Slide title="Character Animation" {...props}>
      <SlideBody bullet>
        <SlideText>Steps animation</SlideText>
        <SlideText>Walking in a circle</SlideText>
      </SlideBody>
    </Slide>
  )
}
