import { Slide, SlideBody, SlideText, type SlideProps } from '@components'
import { Frame } from '@components/Frame'
import { useIsTouch } from '@hooks'
import { useOverlay } from '@stores'
import { useEffect } from 'react'

export function End(props: SlideProps) {
  const isTouch = useIsTouch()
  const setLogo = useOverlay(s => s.setLogo)
  const setDemo = useOverlay(s => s.setDemo)

  useEffect(() => {
    setLogo({ visible: false })
    setDemo(undefined)
  }, [setLogo, setDemo])

  return (
    <Slide title="The End... ?" {...props}>
      <Frame
        position={[1.8, 1.7, 0.7]}
        scale={1.1}
        onDoubleClick={() => window.open('https://overfloor.vercel.app')}
        onClick={() => isTouch && window.open('https://overfloor.vercel.app')}
      >
        <img src="/images/overfloor.png" className="fixed inset-0 size-full object-cover" />
      </Frame>

      <SlideBody position={[0, 0, 1]}>
        <SlideText>Try out the full game!</SlideText>
        <SlideText fontSize={0.2} anchorX={isTouch ? -2.65 : -2.1} anchorY="top">
          {`${isTouch ? 'Touch' : 'Double click'} 👉`}
        </SlideText>
      </SlideBody>

      <SlideBody position={[0, 0, 2.95]}>
        <SlideText
          bold
          fontSize={0.25}
          color="dodgerblue"
          onClick={() => window.open('https://github.com/dammafra/from-zero-to-threejs/tree/public?tab=readme-ov-file#credits')} //prettier-ignore
        >
          Credits
        </SlideText>
      </SlideBody>
    </Slide>
  )
}
