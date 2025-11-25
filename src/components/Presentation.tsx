import type { SlideProps } from '@components'
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
  const [, navigate] = useLocation()
  const slides = useMemo(() => Children.map(children, c => c), [children])

  const indexRef = useRef(params?.index ? +params.index : 0)
  const next = useCallback(
    (name: string) => {
      indexRef.current = indexRef.current + (name === 'next' ? 1 : name === 'previous' ? -1 : 0)
      if (indexRef.current < 0) indexRef.current = 0
      if (indexRef.current > slides.length - 1) indexRef.current = slides.length - 1
      return navigate(`/${indexRef.current}`)
    },
    [navigate, slides],
  )

  return (
    <KeyboardControls
      map={[
        { name: 'next', keys: ['ArrowDown', 'ArrowRight'], up: false },
        { name: 'previous', keys: ['ArrowUp', 'ArrowLeft'], up: false },
        { name: 'reset', keys: ['KeyR'] },
      ]}
      onChange={next}
    >
      {slides.length && (
        <Switch>
          <Route path="/:index">
            {params => {
              const slide = slides.at(+params.index)
              if (!slide) return <></>

              return cloneElement(slide, {
                // onDoubleClick: () => handlers.reset(i),
                backgroundColor: slide.props.backgroundColor || backgroundColor,
                titleColor: slide.props.titleColor || titleColor,
              })
            }}
          </Route>

          <Route>
            <Redirect to="/0" />
          </Route>
        </Switch>
      )}
    </KeyboardControls>
  )
}
