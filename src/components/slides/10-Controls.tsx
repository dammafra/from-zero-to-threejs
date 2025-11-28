import { Camera } from '@components/models'
import { Slide, type SlideProps } from '@components/Slide'
import { SlideBody, SlideText } from '@components/SlideBody'
import { PivotControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Vector3, type Object3D } from 'three'

export function Controls(props: SlideProps) {
  const cameraRef = useRef<Object3D>(null)

  useFrame(() => {
    cameraRef.current?.lookAt(new Vector3(-1, 0, 0))
  })

  return (
    <Slide title="Controls" {...props}>
      <SlideBody fontSize={0.25}>
        <SlideText>Classi che permettono di controllare</SlideText>
        <SlideText>gli oggetti, tra cui le Camere:</SlideText>
        <SlideText
          bullet
          onClick={() => window.open('https://threejs.org/examples/?q=fly#misc_controls_fly')}
        >
          FlyControls
        </SlideText>
        <SlideText
          bullet
          onClick={() => window.open('https://threejs.org/examples/?q=fps#games_fps')}
        >
          FirstPersonControls
        </SlideText>
        <SlideText
          bullet
          onClick={() => window.open('https://threejs.org/examples/?q=orbit#misc_controls_orbit')}
        >
          OrbitControls
        </SlideText>
        <SlideText
          bullet
          onClick={() =>
            window.open('https://threejs.org/examples/?q=track#misc_controls_trackball')
          }
        >
          TrackballControls
        </SlideText>
      </SlideBody>

      <group ref={cameraRef} position={[-1.8, 2, 2.1]} scale={0.2}>
        <PivotControls anchor={[0, 0, 0]} activeAxes={[true, false, true]}>
          <Camera />
        </PivotControls>
      </group>
    </Slide>
  )
}
