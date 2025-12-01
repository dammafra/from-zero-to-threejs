import { Slide, SlideBody, SlideText, type SlideProps } from '@components'
import { Camera } from '@components/models'
import { a, useSpring } from '@react-spring/three'
import { PivotControls } from '@react-three/drei'
import { useOverlay } from '@stores'
import { useEffect, useRef } from 'react'
import { MathUtils, Vector3, type Object3D } from 'three'

export function Controls(props: SlideProps) {
  const setLogo = useOverlay(s => s.setLogo)
  const setDemo = useOverlay(s => s.setDemo)

  const cameraRef = useRef<Object3D>(null)

  useEffect(() => {
    setLogo({ visible: false })
    setDemo('3-animating')
  }, [setLogo, setDemo])

  useSpring({
    from: { t: MathUtils.degToRad(70) },
    to: { t: MathUtils.degToRad(120) },
    loop: { reverse: true },
    config: { duration: 3000 },
    onChange: result => {
      if (!cameraRef.current) return

      const t = result.value.t
      const r = 2
      const x = Math.cos(t) * r
      const z = Math.sin(t) * r

      cameraRef.current.position.set(x, 2, z)
      cameraRef.current.lookAt(new Vector3())
    },
  })

  return (
    <Slide title="Controls" {...props}>
      <SlideBody fontSize={0.25}>
        <SlideText>Classes that allow controlling</SlideText>
        <SlideText>objects, including the Camera:</SlideText>
        <SlideText
          bullet
          onClick={() => window.open('https://threejs.org/examples#misc_controls_fly')}
        >
          FlyControls
        </SlideText>
        <SlideText bullet onClick={() => window.open('https://threejs.org/examples#games_fps')}>
          FirstPersonControls
        </SlideText>
        <SlideText
          bullet
          onClick={() => window.open('https://threejs.org/examples#misc_controls_orbit')}
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

      <a.group ref={cameraRef} scale={0.2}>
        <PivotControls anchor={[0, 0, 0]} disableScaling>
          <Camera />
        </PivotControls>
      </a.group>
    </Slide>
  )
}
