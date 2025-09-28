import { KeyboardControls } from '@react-three/drei'
import usePresentation from '@stores/use-presentation'
import { cloneElement, useEffect, type ReactElement } from 'react'
import { useShallow } from 'zustand/shallow'
import { type SlideProps } from './Slide'

interface PresentationProps {
  slides: ReactElement<SlideProps>[]
}

export default function Presentation({ slides }: PresentationProps) {
  const activeIndex = usePresentation(state => state.activeIndex)
  const handlers = usePresentation(
    useShallow(state => ({
      reset: state.reset,
      next: state.next,
      previous: state.previous,
    })),
  )

  const setSlidesCount = usePresentation(state => state.setSlidesCount)
  useEffect(() => setSlidesCount(slides.length), [])

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
          position: child.props.position || [0, 0, i * 10],
          onDoubleClick: () => handlers.reset(i),
        }),
      )}
    </KeyboardControls>
  )
}
