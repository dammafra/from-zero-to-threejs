import { Slide, SlideBody, SlideText, type SlideProps } from '@components'
import { Frame } from '@components/Frame'
import { useIsTouch } from '@hooks'
import { useOverlay } from '@stores'
import { useEffect } from 'react'

export function End(props: SlideProps) {
  const isTouch = useIsTouch()
  const setDemo = useOverlay(s => s.setDemo)

  useEffect(() => setDemo(undefined), [setDemo])

  return (
    <Slide title="The End... ?" {...props}>
      <Frame
        position={[1.5, 1.5, 1.3]}
        scale={1.1}
        onDoubleClick={() => window.open('https://overfloor.vercel.app')}
        onClick={() => isTouch && window.open('https://overfloor.vercel.app')}
      >
        <img src="/images/overfloor.png" className="fixed inset-0 size-full object-cover" />
      </Frame>

      <SlideBody>
        <SlideText>Try out the full game!</SlideText>
      </SlideBody>

      <SlideBody fontSize={0.15} position={[isTouch ? 2.9 : 2.5, 0, 3]}>
        <SlideText>{`${isTouch ? 'Touch' : 'Double click'} 👉`}</SlideText>
      </SlideBody>
    </Slide>
  )
}
