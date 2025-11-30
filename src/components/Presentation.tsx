import { Overlay } from '@components/overlay'
import { useTransition } from '@react-spring/three'
import { KeyboardControls } from '@react-three/drei'
import {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
} from 'react'
import { type ColorRepresentation } from 'three'
import { Route, useLocation, useRoute } from 'wouter'
import { Environment } from './Environment'
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

  const [index, setIndex] = useState(params?.index && !isNaN(+params.index) ? +params.index : 0)
  const previousIndexRef = useRef(0)

  useEffect(() => {
    const value = localStorage.getItem('demo:last-slide-index')
    if (value !== null) setIndex(+value)
    localStorage.removeItem('demo:last-slide-index')
  }, [])

  useEffect(() => {
    if (!match) return
    navigate(`/slides/${index}`)
  }, [match, index, navigate])

  const slides = useMemo(() => Children.map(children, c => c), [children])

  const transition = useTransition(slides.at(index), {
    from: { position: [0, 0, index >= previousIndexRef.current ? 20 : -20] },
    enter: { position: [0, 0, 0] },
    leave: { position: [0, 0, index >= previousIndexRef.current ? -20 : 20] },
  })

  return (
    <>
      <Environment index={index} />
      <KeyboardControls
        map={[
          { name: 'next', keys: ['ArrowDown', 'ArrowRight'], up: false },
          { name: 'previous', keys: ['ArrowUp', 'ArrowLeft'], up: false },
          { name: 'reset', keys: ['KeyR'] },
        ]}
        onChange={name =>
          setIndex(value => {
            previousIndexRef.current = value
            const index = value + ({ next: 1, previous: -1 }[name] || 0)
            if (index < 0) return 0
            if (index > slides.length - 1) return slides.length - 1
            return index
          })
        }
      >
        <Overlay show={match} index={index} />
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
    </>
  )
}
