import { useIsTouch } from '@hooks'
import { useOverlay } from '@stores'
import { SlideBody, SlideText } from './SlideBody'

export function DemoHint() {
  const isTouch = useIsTouch()
  const demo = useOverlay(s => s.demo)

  return (
    <SlideBody fontSize={0.15} position={[isTouch ? 3.2 : 2.7, 0, 2.75]}>
      <SlideText>{`${isTouch ? 'Tap' : 'Double click'} to expand 👉`}</SlideText>
      <SlideText
        bold
        color="dodgerblue"
        anchorY={-0.15}
        anchorX={isTouch ? -0.03 : -0.62}
        onClick={() => window.open(`https://github.com/dammafra/from-zero-to-threejs/blob/public/demo/${demo}/script.js`)} // prettier-ignore
      >
        Source Code
      </SlideText>
    </SlideBody>
  )
}
