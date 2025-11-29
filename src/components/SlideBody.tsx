import { Text, type TextProps } from '@react-three/drei'
import type { ThreeEvent } from '@react-three/fiber'
import { Children, Suspense, type ReactElement } from 'react'
import { MathUtils, Mesh, MeshBasicMaterial } from 'three'
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
  lineHeight = 1,
  color = 'black',

  position,
  scale,
  rotation,
  quaternion,

  ...props
}: SlideBodyProps) {
  const onHover = (event: ThreeEvent<PointerEvent>) => {
    const mesh = event.object as Mesh
    const material = mesh.material as MeshBasicMaterial
    material.color.set('dodgerblue')
  }

  const onLeave = (event: ThreeEvent<PointerEvent>) => {
    const mesh = event.object as Mesh
    const material = mesh.material as MeshBasicMaterial
    material.color.set('black')
  }

  return (
    <Suspense>
      <group position={[-3.8 + offset, 0, -1]}>
        <group position={position} scale={scale} rotation={rotation} quaternion={quaternion}>
          {Children.map(children, (child, i) => (
            <Hoverable
              enabled={!!child.props.onClick}
              onPointerOver={onHover}
              onPointerLeave={onLeave}
            >
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
                anchorX={0}
                {...props}
                {...child.props}
              >
                {(child.props.bullet || bullet) && '• '}
                {child.props.children}
                {child.props.onClick && ' ↗'}
              </Text>
            </Hoverable>
          ))}
        </group>
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
