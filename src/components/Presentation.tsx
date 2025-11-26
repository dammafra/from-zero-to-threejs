import { type SlideProps } from '@components'
import { useTransition } from '@react-spring/three'
import { KeyboardControls } from '@react-three/drei'
import { Children, cloneElement, useCallback, useMemo, useRef, type ReactElement } from 'react'
import { type ColorRepresentation } from 'three'
import { Redirect, Route, Switch, useLocation, useRoute } from 'wouter'

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
  const [, params] = useRoute('/:index')
  const [location, navigate] = useLocation()
  const slides = useMemo(() => Children.map(children, c => c), [children])

  const indexRef = useRef(params?.index ? +params.index : 0)
  const previousIndexRef = useRef(0)
  const next = useCallback(
    (name: string) => {
      previousIndexRef.current = indexRef.current
      indexRef.current = indexRef.current + (name === 'next' ? 1 : name === 'previous' ? -1 : 0)
      if (indexRef.current < 0) indexRef.current = 0
      if (indexRef.current > slides.length - 1) indexRef.current = slides.length - 1
      return navigate(`/${indexRef.current}`)
    },
    [navigate, slides],
  )

  const transition = useTransition(location, {
    from: { position: [0, 0, indexRef.current >= previousIndexRef.current ? 20 : -20] },
    enter: { position: [0, 0, 0] },
    leave: { position: [0, 0, indexRef.current >= previousIndexRef.current ? -20 : 20] },
  })

  return (
    <KeyboardControls
      map={[
        { name: 'next', keys: ['ArrowDown', 'ArrowRight'], up: false },
        { name: 'previous', keys: ['ArrowUp', 'ArrowLeft'], up: false },
        { name: 'reset', keys: ['KeyR'] },
      ]}
      onChange={next}
    >
      {slides.length &&
        transition((spring, location) => (
          <Switch location={location}>
            <Route path="/:index">
              {params => {
                const slide = slides.at(+params.index)
                if (!slide) return <></>

                // @ts-expect-error cloneElement doesn't know slide is an animated component
                return cloneElement(slide, {
                  backgroundColor: slide.props.backgroundColor || backgroundColor,
                  titleColor: slide.props.titleColor || titleColor,
                  ...spring,
                })
              }}
            </Route>

            <Route>
              <Redirect to="/0" />
            </Route>
          </Switch>
        ))}
    </KeyboardControls>
  )
}
