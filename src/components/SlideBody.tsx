import { Text, useCursor, type TextProps } from '@react-three/drei'
import type { ThreeEvent } from '@react-three/fiber'
import { Children, Suspense, useState, type ReactElement } from 'react'
import { MathUtils, Mesh, MeshBasicMaterial } from 'three'

interface SlideBodyProps extends SlideTextProps {
  offset?: number
  children: ReactElement<SlideTextProps> | ReactElement<SlideTextProps>[]
}

export function SlideBody({
  children,
  offset = 0,
  bold = false,
  bullet = false,
  fontSize = 0.35,
  lineHeight = 1,
  color = 'black',
  ...props
}: SlideBodyProps) {
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  const onHover = (event: ThreeEvent<PointerEvent>) => {
    setHovered(true)
    const mesh = event.object as Mesh
    const material = mesh.material as MeshBasicMaterial
    material.color.set('dodgerblue')
  }

  const onLeave = (event: ThreeEvent<PointerEvent>) => {
    setHovered(false)
    const mesh = event.object as Mesh
    const material = mesh.material as MeshBasicMaterial
    material.color.set('black')
  }

  return (
    <Suspense>
      <group position={[-3.8 + offset, 0, -1]}>
        {Children.map(children, (child, i) => (
          <>
            {(child.props.bullet || bullet) && (
              <Text
                font="/fonts/EncodeSansSemiExpanded-Regular.ttf"
                fontSize={fontSize}
                position-z={i * ((child.props.fontSize || fontSize) + 0.1)}
                rotation-x={MathUtils.degToRad(-90)}
                color={child.props.color || color}
                anchorX={0}
              >
                •
              </Text>
            )}
            <Text
              font={
                child.props.bold || bold
                  ? '/fonts/EncodeSansSemiExpanded-Bold.ttf'
                  : '/fonts/EncodeSansSemiExpanded-Regular.ttf'
              }
              fontSize={fontSize}
              position-z={i * ((child.props.fontSize || fontSize) + 0.1)}
              rotation-x={MathUtils.degToRad(-90)}
              color={child.props.color || color}
              anchorX={child.props.bullet || bullet ? -0.25 : 0}
              onPointerOver={child.props.onClick ? onHover : undefined}
              onPointerOut={child.props.onClick ? onLeave : undefined}
              {...props}
              {...child.props}
            >
              {child.props.children}
              {}
              {child.props.onClick && ' ↗'}
            </Text>
          </>
        ))}
      </group>
    </Suspense>
  )
}

interface SlideTextProps extends TextProps {
  bold?: boolean
  bullet?: boolean
}

export function SlideText(_props: SlideTextProps) {
  return <></>
}
