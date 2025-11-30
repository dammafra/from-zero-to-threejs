import { Hoverable } from '@components/helpers'
import { Slide, type SlideProps } from '@components/Slide'
import { SlideText } from '@components/SlideBody'
import { animated, config, useSpring } from '@react-spring/three'
import {
  Billboard,
  Box,
  Capsule,
  Circle,
  Cone,
  Cylinder,
  Dodecahedron,
  Icosahedron,
  Octahedron,
  Plane,
  Ring,
  Sphere,
  Tetrahedron,
  Torus,
  TorusKnot,
} from '@react-three/drei'
import { useOverlay } from '@stores'
import { useEffect, useState, type JSX } from 'react'
import { MathUtils, MeshNormalMaterial } from 'three'

const AnimatedBillboard = animated(Billboard)

type GeometryItemProps = Omit<JSX.IntrinsicElements['group'], 'id'> & {
  id: string
}

function GeometryItem({ children, id, ...props }: GeometryItemProps) {
  const [visible, setVisible] = useState(false)
  const hoverSpring = useSpring({ scale: visible ? 1 : 0, config: config.wobbly })

  return (
    <Hoverable
      {...props}
      onPointerOver={() => setVisible(true)}
      onPointerLeave={() => setVisible(false)}
    >
      {children}
      <AnimatedBillboard position-y={0.7} {...hoverSpring}>
        <Plane scale={[1.5, 0.25, 1]} material-color="black" />
        <SlideText
          bold
          fontSize={0.1}
          color="white"
          onClick={() => window.open(`https://threejs.org/docs#${id}`)}
        >
          {id}
        </SlideText>
      </AnimatedBillboard>
    </Hoverable>
  )
}

export function Geometries(props: SlideProps) {
  const setDemo = useOverlay(s => s.setDemo)

  const material = new MeshNormalMaterial({ flatShading: true })

  useEffect(() => setDemo(undefined), [setDemo])

  return (
    <Slide title="Geometries" {...props}>
      <group scale={0.85}>
        {/* Box */}
        <GeometryItem id="BoxGeometry" position={[-3, 0.5, -0.5]}>
          <Box scale={0.8} material={material} castShadow />
        </GeometryItem>

        {/* Capsule */}
        <GeometryItem id="CapsuleGeometry" position={[-1.5, 0.6, -0.5]}>
          <Capsule scale={0.4} material={material} castShadow />
        </GeometryItem>

        {/* Circle */}
        <GeometryItem id="CircleGeometry" position={[0, 0, -0.5]}>
          <Circle scale={0.5} material={material} rotation-x={MathUtils.degToRad(-90)} />
        </GeometryItem>

        {/* Cone */}
        <GeometryItem id="ConeGeometry" position={[1.5, 0.5, -0.5]}>
          <Cone scale={[0.5, 1, 0.5]} material={material} castShadow />
        </GeometryItem>

        {/* Cylinder */}
        <GeometryItem id="CylinderGeometry" position={[3, 0.5, -0.5]}>
          <Cylinder scale={[0.5, 1, 0.5]} material={material} castShadow />
        </GeometryItem>

        {/* Dodecahedron */}
        <GeometryItem id="DodecahedronGeometry" position={[-3, 0.5, 0.7]}>
          <Dodecahedron scale={0.5} material={material} castShadow />
        </GeometryItem>

        {/* Icosahedron */}
        <GeometryItem id="IcosahedronGeometry" position={[-1.5, 0.5, 0.7]}>
          <Icosahedron scale={0.5} material={material} castShadow />
        </GeometryItem>

        {/* Plane */}
        <GeometryItem id="PlaneGeometry" position={[0, 0, 0.7]}>
          <Plane scale={0.8} material={material} rotation-x={MathUtils.degToRad(-90)} />
        </GeometryItem>

        {/* Octahedron */}
        <GeometryItem id="OctahedronGeometry" position={[1.5, 0.5, 0.7]}>
          <Octahedron scale={0.5} material={material} castShadow />
        </GeometryItem>

        {/* Ring */}
        <GeometryItem id="RingGeometry" position={[3, 0, 0.7]}>
          <Ring scale={0.5} material={material} rotation-x={MathUtils.degToRad(-90)} />
        </GeometryItem>

        {/* Sphere */}
        <GeometryItem id="SphereGeometry" position={[-2.25, 0.5, 2]}>
          <Sphere scale={0.5} material={material} castShadow />
        </GeometryItem>

        {/* Tetrahedron */}
        <GeometryItem id="TetrahedronGeometry" position={[-0.75, 0.4, 2]}>
          <Tetrahedron scale={0.6} material={material} castShadow />
        </GeometryItem>

        {/* Torus */}
        <GeometryItem id="TorusGeometry" position={[0.75, 0.2, 2]}>
          <Torus scale={0.4} material={material} rotation-x={MathUtils.degToRad(-90)} castShadow />
        </GeometryItem>

        {/* TorusKnot */}
        <GeometryItem id="TorusKnotGeometry" position={[2.25, 0.4, 2]}>
          <TorusKnot scale={0.35} material={material} rotation-x={MathUtils.degToRad(-90)} />
        </GeometryItem>
      </group>
    </Slide>
  )
}
