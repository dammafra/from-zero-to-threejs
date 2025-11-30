import { Slide, type SlideProps } from '@components/Slide'
import { SlideBody, SlideText } from '@components/SlideBody'
import { useOverlay } from '@stores'
import { useEffect } from 'react'

export function PlayerAnimation(props: SlideProps) {
  const setDemo = useOverlay(s => s.setDemo)
  useEffect(() => setDemo('8-shadows'), [])

  return (
    <Slide title="Animazione Player" {...props}>
      <SlideBody bullet>
        <SlideText>Animazione dei passi</SlideText>
        <SlideText>Camminata in circolo</SlideText>
      </SlideBody>
    </Slide>
  )
}
