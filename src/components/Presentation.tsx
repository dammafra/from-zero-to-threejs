import { KeyboardControls } from '@react-three/drei'
import usePresentation from '@stores/use-presentation'
import { cloneElement, useEffect, type ReactElement } from 'react'
import { Vector3, type ColorRepresentation } from 'three'
import { useShallow } from 'zustand/shallow'
import { type SlideProps } from './Slide'

interface PresentationProps {
  slides: ReactElement<SlideProps>[]
  flowAxes?: [boolean, boolean, boolean]
  flowDirection?: number
  gap?: number
  buffer?: number
  defaultTitleColor?: ColorRepresentation
  defaultBackgroundColor?: ColorRepresentation
}

export default function Presentation({
  slides,
  flowAxes = [false, false, true],
  flowDirection = 1,
  gap = 10,
  buffer = Infinity,
  defaultTitleColor = 'red',
  defaultBackgroundColor = 'white',
}: PresentationProps) {
  const activeIndex = usePresentation(state => state.activeIndex)
  const handlers = usePresentation(
    useShallow(state => ({
      reset: state.reset,
      next: state.next,
      previous: state.previous,
    })),
  )

  const setSlidesCount = usePresentation(state => state.setSlidesCount)
  useEffect(() => setSlidesCount(slides.length), [setSlidesCount, slides.length])

  const [flowX, flowY, flowZ] = flowAxes

  return (
    <KeyboardControls
      map={[
        { name: 'next', keys: ['ArrowDown', 'ArrowRight'], up: false },
        { name: 'previous', keys: ['ArrowUp', 'ArrowLeft'], up: false },
        { name: 'reset', keys: ['KeyR'], up: false },
      ]}
      onChange={name => handlers[name as keyof typeof handlers]()}
    >
      {slides.map((child, i) =>
        cloneElement(child, {
          key: `slide-${i}`,
          active: i === activeIndex,
          visible: activeIndex === -1 || Math.abs(i - activeIndex) <= Math.round(buffer),
          position:
            child.props.position ||
            new Vector3(
              flowX ? i * gap : 0,
              flowY ? i * gap : 0,
              flowZ ? i * gap : 0,
            ).multiplyScalar(flowDirection),
          onDoubleClick: () => handlers.reset(i),
          titleColor: child.props.titleColor || defaultTitleColor,
          backgroundColor: child.props.backgroundColor || defaultBackgroundColor,
        }),
      )}
    </KeyboardControls>
  )
}
