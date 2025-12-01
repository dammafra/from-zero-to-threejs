import { Slide, SlideBody, SlideText, type SlideProps } from '@components'
import { Hoverable } from '@components/helpers'
import { useIsTouch } from '@hooks'
import { animated, config, useSpring } from '@react-spring/three'
import {
  Billboard,
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
  const isTouch = useIsTouch()
  const [visible, setVisible] = useState(isTouch)
  const hoverSpring = useSpring({ scale: visible ? 1 : 0, config: config.wobbly })

  return (
    <Hoverable
      {...props}
      onPointerOver={() => setVisible(true)}
      onPointerLeave={() => setVisible(isTouch)}
    >
      {children}
      <AnimatedBillboard position-y={0.7} position-z={isTouch ? -0.3 : 0} {...hoverSpring}>
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
  const isTouch = useIsTouch()
  const setDemo = useOverlay(s => s.setDemo)

  const material = new MeshNormalMaterial({ flatShading: true })

  useEffect(() => setDemo(undefined), [setDemo])

  return (
    <Slide title="Geometries" {...props}>
      <group scale={0.85}>
        <group position-y={0.5}>
          {/* First row */}
          <group position-z={-0.5}>
            {/* Box */}
            <GeometryItem id="BoxGeometry" position-x={-3.2}>
              <mesh scale={0.8} material={material} castShadow position-y={-0.1}>
                <boxGeometry />
              </mesh>
            </GeometryItem>

            {/* Sphere */}
            <GeometryItem id="SphereGeometry" position-x={-1.6}>
              <Sphere scale={0.5} material={material} castShadow />
            </GeometryItem>

            {/* Torus */}
            <GeometryItem id="TorusGeometry">
              <Torus
                scale={0.35}
                material={material}
                rotation-x={MathUtils.degToRad(-90)}
                castShadow
                position-y={-0.36}
              />
            </GeometryItem>

            {/* TorusKnot */}
            <GeometryItem id="TorusKnotGeometry" position-x={1.6}>
              <TorusKnot
                scale={0.3}
                material={material}
                rotation-x={MathUtils.degToRad(-90)}
                position-y={-0.23}
              />
            </GeometryItem>

            {/* Cylinder */}
            <GeometryItem id="CylinderGeometry" position-x={3.2}>
              <Cylinder scale={[0.5, 1, 0.5]} material={material} castShadow />
            </GeometryItem>
          </group>

          {/* Second row */}
          <group position-z={0.7}>
            {/* Plane */}
            <GeometryItem id="PlaneGeometry" position-x={-3.2}>
              <mesh material={material} rotation-x={MathUtils.degToRad(-90)} position-y={-0.5}>
                <planeGeometry args={[0.8, 0.8]} />
              </mesh>
            </GeometryItem>

            {/* Circle */}
            <GeometryItem id="CircleGeometry" position-x={-1.6}>
              <mesh material={material} rotation-x={MathUtils.degToRad(-90)} position-y={-0.5}>
                <circleGeometry args={[0.5]} />
              </mesh>
            </GeometryItem>

            {/* Ring */}
            <GeometryItem id="RingGeometry">
              <Ring
                scale={0.5}
                material={material}
                rotation-x={MathUtils.degToRad(-90)}
                position-y={-0.5}
              />
            </GeometryItem>

            {/* Capsule */}
            <GeometryItem id="CapsuleGeometry" position-x={1.6}>
              <mesh material={material} castShadow position-y={0.05}>
                <capsuleGeometry args={[0.4, 0.3]} />
              </mesh>
            </GeometryItem>

            {/* Cone (swapped with TorusKnot) */}
            <GeometryItem id="ConeGeometry" position-x={3.2}>
              <Cone scale={[0.5, 1, 0.5]} material={material} castShadow />
            </GeometryItem>
          </group>

          {/* Third row */}
          <group position-z={2}>
            <GeometryItem id="TetrahedronGeometry" position-x={-2.4}>
              <Tetrahedron scale={0.6} material={material} castShadow position-y={-0.15} />
            </GeometryItem>
            <GeometryItem id="OctahedronGeometry" position-x={-0.8}>
              <Octahedron scale={0.5} material={material} castShadow />
            </GeometryItem>
            <GeometryItem id="IcosahedronGeometry" position-x={0.8}>
              <Icosahedron scale={0.5} material={material} castShadow position-y={-0.07} />
            </GeometryItem>
            <GeometryItem id="DodecahedronGeometry" position-x={2.4}>
              <Dodecahedron scale={0.5} material={material} castShadow position-y={-0.03} />
            </GeometryItem>
          </group>
        </group>
      </group>

      {!isTouch && (
        <SlideBody fontSize={0.2} position={[6.8, 0, 3]}>
          <SlideText>Hover 👆</SlideText>
        </SlideBody>
      )}
    </Slide>
  )
}
