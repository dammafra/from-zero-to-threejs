import { Slide, SlideBody, SlideText, type SlideProps } from '@components'
import { Target } from '@components/models'
import { useOverlay } from '@stores'
import { useEffect } from 'react'
import { MathUtils } from 'three'

export function Goal(props: SlideProps) {
  const setLogo = useOverlay(s => s.setLogo)

  useEffect(() => {
    setLogo({ position: [2.5, 1.3, 1.25], rotation: [0, 0, 0], scale: 0.4 })
  }, [setLogo])

  return (
    <Slide title="Goal" {...props}>
      <Target scale={3.5} position={[3, 0, -0.5]} rotation-y={MathUtils.degToRad(-45)} />
      <SlideBody>
        <SlideText>Create the foundations</SlideText>
        <SlideText>for a minigame:</SlideText>
        <SlideText bullet bold>
          Character
        </SlideText>
        <SlideText anchorX={-0.25}>with movement animation</SlideText>
        <SlideText bullet bold>
          Environment
        </SlideText>
        <SlideText anchorX={-0.25}>grid with tiles that disappear</SlideText>
      </SlideBody>
    </Slide>
  )
}
