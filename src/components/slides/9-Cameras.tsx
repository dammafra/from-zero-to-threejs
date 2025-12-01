import { Slide, SlideBody, SlideText, type SlideProps } from '@components'
import { Hoverable } from '@components/helpers'
import { Camera as CameraModel, Headset } from '@components/models'
import { useIsTouch } from '@hooks'
import { OrthographicCamera } from '@react-three/drei'
import { useOverlay } from '@stores'
import { useEffect, useState } from 'react'
import { MathUtils } from 'three'

export function Cameras(props: SlideProps) {
  const isTouch = useIsTouch()

  const setLogo = useOverlay(s => s.setLogo)
  const setDemo = useOverlay(s => s.setDemo)

  const [orthographic, setOrthographic] = useState(false)

  useEffect(() => {
    setLogo({ visible: true, position: [-20, 0, 0], scale: 0 })
    setDemo(undefined)
  }, [setLogo, setDemo])

  return (
    <Slide title="Cameras" {...props}>
      <SlideBody>
        <SlideText>There are several types:</SlideText>
        <SlideText
          bullet
          onClick={() => window.open('https://threejs.org/docs#PerspectiveCamera')}
          color={orthographic ? 'black' : 'dodgerblue'}
        >
          PerspectiveCamera
        </SlideText>
        <SlideText
          bullet
          onClick={() => window.open('https://threejs.org/docs#OrthographicCamera')}
          color={orthographic ? 'dodgerblue' : 'black'}
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

      <SlideBody position={[5.9, 0, 1.8]}>
        <SlideText fontSize={0.2}>👆{`${isTouch ? 'Touch' : 'Click'} Me`}</SlideText>
      </SlideBody>

      <OrthographicCamera makeDefault={orthographic} position={1} near={-50} far={50} />

      <Hoverable position={[2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          position-y={0.5}
          onClick={() => setOrthographic(!orthographic)}
        >
          <boxGeometry />
          <meshStandardMaterial color="red" />
        </mesh>
        <CameraModel position-y={1.4} scale={0.2} rotation-y={MathUtils.degToRad(30)} />
      </Hoverable>

      <group position={[1.5, 0, 1]}>
        <mesh castShadow receiveShadow position-y={0.35} scale={0.7}>
          <boxGeometry />
          <meshStandardMaterial color="limegreen" />
        </mesh>
        <Headset scale={0.5} position-y={0.76} rotation-y={MathUtils.degToRad(110)} />
      </group>
    </Slide>
  )
}
