import { type SlideProps, Slide } from '@components'
import { Billboard, Center, Float, Text3D, useFont } from '@react-three/drei'
import { useOverlay } from '@stores'
import { useEffect, useRef } from 'react'
import { MeshStandardMaterial } from 'three'

export function Title(props: SlideProps) {
  const setLogo = useOverlay(s => s.setLogo)
  const setDemo = useOverlay(s => s.setDemo)

  const material = useRef(new MeshStandardMaterial({ color: 'orange' }))

  useEffect(() => {
    setLogo({ position: [0.001, -1, 0], scale: 1, visible: true })
    setDemo(undefined)
  }, [setLogo, setDemo])

  return (
    <Slide background={false} {...props}>
      <Billboard>
        <Float position-y={0.5}>
          <Center>
            <Text3D
              castShadow
              receiveShadow
              font="/fonts/audiowide.json"
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
              font="/fonts/audiowide.json"
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

useFont.preload('/fonts/audiowide.json')
