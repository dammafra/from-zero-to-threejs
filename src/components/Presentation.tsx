import { Overlay } from '@components/overlay'
import { useTransition } from '@react-spring/three'
import { KeyboardControls } from '@react-three/drei'
import { Children, cloneElement, useEffect, useMemo, useState, type ReactElement } from 'react'
import { type ColorRepresentation } from 'three'
import { Route, useLocation, useRoute } from 'wouter'
import { type SlideProps } from './Slide'

interface PresentationProps {
  children: ReactElement<SlideProps> | ReactElement<SlideProps>[]
  backgroundColor?: ColorRepresentation
  titleColor?: ColorRepresentation
}

export function Presentation({
  children,
  backgroundColor = 'white',
  titleColor = 'red',
}: PresentationProps) {
  const [match, params] = useRoute('/slides/:index')
  const [, navigate] = useLocation()

  const [{ index, previousIndex }, setSlide] = useState(() => {
    const value = localStorage.getItem('last-slide-index')
    if (value !== null) return { index: +value, previousIndex: 0 }
    return { index: params?.index && !isNaN(+params.index) ? +params.index : 0, previousIndex: 0 }
  })

  useEffect(() => {
    if (!match) return
    navigate(`/slides/${index}`)
    localStorage.setItem('last-slide-index', index.toString())
  }, [match, index, navigate])

  const slides = useMemo(() => Children.map(children, c => c), [children])

  const transition = useTransition(slides.at(index), {
    from: { position: [0, 0, index >= previousIndex ? 20 : -20] },
    enter: { position: [0, 0, 0] },
    leave: { position: [0, 0, index >= previousIndex ? -20 : 20] },
  })

  return (
    <KeyboardControls
      map={[
        { name: 'next', keys: ['ArrowDown', 'ArrowRight'] },
        { name: 'previous', keys: ['ArrowUp', 'ArrowLeft'] },
        { name: 'reset', keys: ['KeyR'] },
        { name: 'shift', keys: ['ShiftLeft', 'ShiftRight'] },
      ]}
      onChange={(name, pressed, state) => {
        if (!pressed) return

        setSlide(({ index: value }) => {
          let index = value + ({ next: 1, previous: -1 }[name] || 0)
          if (index < 0 || (name === 'previous' && state.shift)) index = 0
          if (index > slides.length - 1 || (name === 'next' && state.shift)) index = slides.length - 1 //prettier-ignore
          return { index, previousIndex: value }
        })
      }}
    >
      <Overlay />
      <Route path="/slides/:index?">
        {transition(
          (spring, slide) =>
            slide &&
            // @ts-expect-error cloneElement doesn't know slide is an animated component
            cloneElement(slide, {
              backgroundColor: slide.props.backgroundColor || backgroundColor,
              titleColor: slide.props.titleColor || titleColor,
              ...spring,
            }),
        )}
      </Route>
    </KeyboardControls>
  )
}
