import { Hoverable } from '@components/helpers'
import { Camera as CameraModel, Headset } from '@components/models'
import { Slide, type SlideProps } from '@components/Slide'
import { SlideBody, SlideText } from '@components/SlideBody'
import { OrthographicCamera } from '@react-three/drei'
import { useOverlay } from '@stores'
import { useEffect, useState } from 'react'
import { MathUtils } from 'three'

export function Camera(props: SlideProps) {
  const setLogo = useOverlay(s => s.setLogo)
  const setDemo = useOverlay(s => s.setDemo)
  const [orthographic, setOrthographic] = useState(false)

  useEffect(() => {
    setLogo({ visible: true, position: [-20, 0, 0], scale: 0 })
    setDemo(undefined)
  }, [setLogo])

  return (
    <Slide title="Camera" {...props}>
      <SlideBody>
        <SlideText>Esistono diverse tipologie:</SlideText>
        <SlideText bullet onClick={() => window.open('https://threejs.org/docs#PerspectiveCamera')}>
          PerspectiveCamera
        </SlideText>
        <SlideText
          bullet
          onClick={() => window.open('https://threejs.org/docs#OrthographicCamera')}
        >
          OrthographicCamera
        </SlideText>
        <SlideText bullet onClick={() => window.open('https://threejs.org/docs#ArrayCamera')}>
          ArrayCamera
        </SlideText>
        <SlideText bullet onClick={() => window.open('https://threejs.org/docs#CubeCamera')}>
          CubeCamera
        </SlideText>
        <SlideText bullet onClick={() => window.open('https://threejs.org/docs#StereoCamera')}>
          StereoCamera
        </SlideText>
      </SlideBody>

      <SlideBody position={[6, 0, 1.8]}>
        <SlideText>👆</SlideText>
      </SlideBody>

      <OrthographicCamera makeDefault={orthographic} position={1} near={-50} far={50} />

      <Hoverable>
        <mesh
          castShadow
          receiveShadow
          position={[2, 0.5, 0]}
          onClick={() => setOrthographic(!orthographic)}
        >
          <boxGeometry />
          <meshStandardMaterial color="red" />
        </mesh>
      </Hoverable>
      <CameraModel position={[2.1, 1.2, 0.2]} scale={0.2} rotation-y={MathUtils.degToRad(30)} />

      <mesh
        castShadow
        receiveShadow
        position={[1.5, 0.35, 1]}
        scale={0.7}
        onClick={() => setOrthographic(!orthographic)}
      >
        <boxGeometry />
        <meshStandardMaterial color="limegreen" />
      </mesh>
      <Headset scale={0.5} position={[1.5, 0.76, 1]} rotation-y={MathUtils.degToRad(110)} />
    </Slide>
  )
}
