import { Slide, type SlideProps } from '@components/Slide'
import { SlideBody, SlideText } from '@components/SlideBody'
import { useOverlay } from '@stores'
import { useEffect } from 'react'

export function GridAnimation(props: SlideProps) {
  const setDemo = useOverlay(s => s.setDemo)

  useEffect(() => setDemo('9-player-animation'), [setDemo])

  return (
    <Slide title="Animazione Grid" {...props}>
      <SlideBody fontSize={0.3}>
        <SlideText bullet>Ogni 5 secondi una mattonella</SlideText>
        <SlideText anchorX={-0.2}>deve sparire per poi ricomparire</SlideText>
        <SlideText bullet>Prima di scomparire deve</SlideText>
        <SlideText anchorX={-0.2}>cambiare colore come un</SlideText>
        <SlideText anchorX={-0.2}>semaforo</SlideText>
      </SlideBody>
    </Slide>
  )
}
