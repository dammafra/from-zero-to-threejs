import { Slide, SlideBody, SlideText, type SlideProps } from '@components'
import { useIsTouch } from '@hooks'
import { useOverlay } from '@stores'
import { useEffect } from 'react'

export function CharacterAnimation(props: SlideProps) {
  const isTouch = useIsTouch()
  const setDemo = useOverlay(s => s.setDemo)

  useEffect(() => setDemo('9-character-animation'), [setDemo])

  return (
    <Slide title="Character Animation" {...props}>
      <SlideBody bullet>
        <SlideText>Steps animation</SlideText>
        <SlideText>Walking in a circle</SlideText>
      </SlideBody>

      <SlideBody fontSize={0.15} position={[isTouch ? 2.9 : 2.4, 0, 3]}>
        <SlideText>{`${isTouch ? 'Tap' : 'Double click'} to see the code 👉`}</SlideText>
      </SlideBody>
    </Slide>
  )
}
