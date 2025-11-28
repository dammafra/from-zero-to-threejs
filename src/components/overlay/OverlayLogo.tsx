import { ThreeLogo, WebGLLogo } from '@components/models'
import { a, useSpring } from '@react-spring/three'
import { Billboard, CameraControls, Center, Float } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { MathUtils, type Vector3Tuple } from 'three'
import type { OverlayProps } from './Overlay'

export function OverlayLogo({ index }: OverlayProps) {
  const { controls } = useThree()
  const [hideLogo, setHideLogo] = useState(false)

  useEffect(() => {
    const cameraControls = controls as CameraControls
    if (!cameraControls) return

    const onControlStart = () => setHideLogo(index !== 0 && index !== 4)
    const onRest = () => {
      if (index === 0 || index === 4) {
        setHideLogo(false)
        return
      }

      cameraControls.normalizeRotations()
      const azimuthAngleDelta = Math.abs(0 - Math.abs(Math.round(MathUtils.radToDeg(cameraControls.azimuthAngle)))) //prettier-ignore
      const polarAngleDelta = Math.abs(20 - Math.abs(Math.round(MathUtils.radToDeg(cameraControls.polarAngle)))) //prettier-ignore

      setHideLogo(azimuthAngleDelta > 1 || polarAngleDelta > 1)
    }

    cameraControls.addEventListener('controlstart', onControlStart)
    cameraControls.addEventListener('rest', onRest)

    return () => {
      cameraControls.removeEventListener('controlstart', onControlStart)
      cameraControls.removeEventListener('rest', onRest)
    }
  }, [index, controls])

  const threeLogoSpring = useSpring({
    position: [
      [0.1, 2, -2, -2, 2].at(index) || 20,
      [-0.5, -0.7, -0.7, -0.7].at(index) || 0,
      [-2, 1.5, 1.5, 1.5].at(index) || 0,
    ] as Vector3Tuple,
    scale: hideLogo ? 0 : [1, 0.5, 0.5, 0.1, 0.5].at(index) || 1,
    rotationY: MathUtils.degToRad([0, 0, -360, -360, -360].at(index) || 0),
  })

  const webGLLogoSpring = useSpring({
    positionX: index === 4 ? -2 : -20,
    scale: index === 4 ? 1 : 0,
  })

  return (
    index < 6 && (
      <>
        <Billboard>
          <Float>
            <a.group rotation-y={threeLogoSpring.rotationY} {...threeLogoSpring}>
              <Center>
                <ThreeLogo scale={0.05} />
              </Center>
            </a.group>
          </Float>
        </Billboard>

        <Billboard>
          <Float speed={1.5}>
            <a.group position-x={webGLLogoSpring.positionX}>
              <Center>
                <WebGLLogo scale={2} />
              </Center>
            </a.group>
          </Float>
        </Billboard>
      </>
    )
  )
}
