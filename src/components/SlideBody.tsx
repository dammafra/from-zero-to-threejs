import { a, useSpring } from '@react-spring/three'
import { Text, type TextProps } from '@react-three/drei'
import { useEnvironment } from '@stores'
import { Children, cloneElement, Suspense, type ReactElement } from 'react'
import { MathUtils, type ColorRepresentation } from 'three'
import { Hoverable } from './helpers'

interface SlideBodyProps extends SlideTextProps {
  children: ReactElement<SlideTextProps> | ReactElement<SlideTextProps>[]
  offset?: number
}

export function SlideBody({
  children,
  offset = 0,

  bold = false,
  bullet = false,
  fontSize = 0.35,
  color = 'black',

  position,
  scale,
  rotation,
  quaternion,

  ...props
}: SlideBodyProps) {
  return (
    <group position={[-3.8 + offset, 0, -1]}>
      <group position={position} scale={scale} rotation={rotation} quaternion={quaternion}>
        {Children.map(children, (child, i) =>
          cloneElement(child, {
            bold: child.props.bold || bold,
            bullet: child.props.bullet || bullet,
            fontSize: child.props.fontSize || fontSize,
            position: [0, 0, i * ((child.props.fontSize || fontSize) + 0.1)],
            rotation: [MathUtils.degToRad(-90), 0, 0],
            color: child.props.color || color,
            anchorX: 0,
            ...props,
            ...child.props,
          }),
        )}
      </group>
    </group>
  )
}

interface SlideTextProps extends TextProps {
  bold?: boolean
  bullet?: boolean
  color?: ColorRepresentation
  opacity?: number
}

export function SlideText({
  children,
  bold = false,
  bullet = false,
  fontSize = 0.35,
  color = 'black',
  opacity = 1,
  onClick,
  ...props
}: SlideTextProps) {
  const lights = useEnvironment(s => s.lights)
  const [spring, api] = useSpring(() => ({ color: lights ? color : 'white' }), [lights, color])

  return (
    <Suspense>
      <Hoverable
        enabled={!!onClick}
        onPointerOver={() => api.start({ color: 'dodgerblue' })}
        onPointerLeave={() => api.start({ color: lights ? color : 'white' })}
      >
        <Text
          font={`/fonts/encode-sans-${bold ? 'bold' : 'regular'}.ttf`}
          fontSize={fontSize}
          onClick={onClick}
          {...props}
        >
          {bullet && '• '}
          {children}
          {onClick && ' ↗'}
          {/* @ts-expect-error spring typings */}
          <a.meshBasicMaterial color={spring.color} transparent opacity={opacity} />
        </Text>
      </Hoverable>
    </Suspense>
  )
}
