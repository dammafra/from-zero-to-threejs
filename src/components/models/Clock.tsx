import { Center, useGLTF } from '@react-three/drei'
import { useFrame, type ObjectMap } from '@react-three/fiber'
import React, { useRef, type JSX } from 'react'
import type { Mesh, MeshStandardMaterial } from 'three'
import { type GLTF } from 'three-stdlib'

type GLTFResult = GLTF &
  ObjectMap & {
    nodes: {
      Analog_Clock_1: Mesh
      Second_hand: Mesh
      Minute_hand: Mesh
      Hour_hand: Mesh
    }
    materials: {
      lambert3SG: MeshStandardMaterial
    }
  }

type ModelProps = JSX.IntrinsicElements['group'] & {
  nodesOverride?: {
    Second_hand?: React.RefObject<Mesh>
    Minute_hand?: React.RefObject<Mesh>
    Hour_hand?: React.RefObject<Mesh>
  }
}

function Model({ nodesOverride, ...props }: ModelProps) {
  const { nodes, materials } = useGLTF('/models/clock.glb') as GLTFResult

  return (
    <group {...props} dispose={null}>
      <Center scale={0.001}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Analog_Clock_1.geometry}
          material={materials.lambert3SG}
        />
        <mesh
          ref={nodesOverride?.Second_hand}
          castShadow
          receiveShadow
          geometry={nodes.Second_hand.geometry}
          material={materials.lambert3SG}
        />
        <mesh
          ref={nodesOverride?.Minute_hand}
          castShadow
          receiveShadow
          geometry={nodes.Minute_hand.geometry}
          material={materials.lambert3SG}
        />
        <mesh
          ref={nodesOverride?.Hour_hand}
          castShadow
          receiveShadow
          geometry={nodes.Hour_hand.geometry}
          material={materials.lambert3SG}
        />
      </Center>
    </group>
  )
}

useGLTF.preload('/models/clock.glb')

export function Clock(props: JSX.IntrinsicElements['group']) {
  const secondRef = useRef<Mesh>(null!)
  const minuteRef = useRef<Mesh>(null!)
  const hourRef = useRef<Mesh>(null!)

  // speed factor: 1 real second = 500ms clock second
  const speed = 50

  useFrame((_, delta) => {
    if (!secondRef.current || !minuteRef.current || !hourRef.current) return

    // Rotate second hand
    secondRef.current.rotation.z -= ((Math.PI * 2) / 60) * delta * speed

    // Rotate minute hand
    minuteRef.current.rotation.z -= ((Math.PI * 2) / 3600) * delta * speed

    // Rotate hour hand
    hourRef.current.rotation.z -= ((Math.PI * 2) / 43200) * delta * speed
  })

  return (
    <group {...props}>
      <Model
        nodesOverride={{
          Second_hand: secondRef,
          Hour_hand: minuteRef,
          Minute_hand: hourRef,
        }}
      />
    </group>
  )
}
