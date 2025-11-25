import { type SlideProps, Slide } from '@components'
import { Logo } from '@components/models'
import { Billboard, Center, Float, Text3D, useFont } from '@react-three/drei'
import { useRef } from 'react'
import { MeshStandardMaterial } from 'three'

export function Title(props: SlideProps) {
  const material = useRef(new MeshStandardMaterial({ color: 'orange' }))

  return (
    <Slide background={false} {...props}>
      <Billboard>
        <Float position-z={-2} position-y={-0.5}>
          <Center>
            <Logo scale={0.05} />
          </Center>
        </Float>

        <Float position-y={0.5}>
          <Center>
            <Text3D
              castShadow
              receiveShadow
              font="/fonts/Audiowide_Regular.json"
              size={0.8}
              height={0.1}
              bevelEnabled
              bevelThickness={0.02}
              bevelSize={0.02}
              material={material.current}
            >
              From zero to...
            </Text3D>
          </Center>
        </Float>

        <Float>
          <Center position-y={-0.5} position-z={0.5}>
            <Text3D
              castShadow
              receiveShadow
              font="/fonts/Audiowide_Regular.json"
              size={0.8}
              height={0.1}
              bevelEnabled
              bevelThickness={0.02}
              bevelSize={0.02}
              material={material.current}
            >
              Three.js
            </Text3D>
          </Center>
        </Float>
      </Billboard>
    </Slide>
  )
}

useFont.preload('/fonts/Audiowide_Regular.json')
