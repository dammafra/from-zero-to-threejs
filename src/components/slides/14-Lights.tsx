import { Slide, SlideBody, SlideText, type SlideProps } from '@components'
import { Hoverable } from '@components/helpers'
import { useSpring } from '@react-spring/three'
import { Box, SpotLight } from '@react-three/drei'
import { useEnvironment, useOverlay } from '@stores'
import { useEffect, useMemo, useState } from 'react'
import { Material, MeshBasicMaterial, MeshStandardMaterial } from 'three'

export function Lights(props: SlideProps) {
  const setDemo = useOverlay(s => s.setDemo)
  const setLights = useEnvironment(s => s.setLights)

  const basicMaterial = useMemo(() => new MeshBasicMaterial({ color: 'red' }), [])
  const standardMaterial = useMemo(() => new MeshStandardMaterial({ color: 'red' }), [])

  const [toggleMaterial, setToggle] = useState(false)
  const [material, setMaterial] = useState<Material>(basicMaterial)
  const [materialId, setMaterialId] = useState('MeshBasicMaterial')

  useEffect(() => {
    setDemo(undefined)

    setLights(false)
    return () => setLights(true)
  }, [setDemo, setLights])

  useEffect(() => {
    setMaterial(toggleMaterial ? standardMaterial : basicMaterial)
    setMaterialId(toggleMaterial ? 'MeshStandardMaterial' : 'MeshBasicMaterial')
  }, [toggleMaterial, setMaterial, setMaterialId, basicMaterial, standardMaterial])

  const textSpring = useSpring({
    from: { color: 'black' },
    to: { color: 'white' },
    config: { duration: 500 },
    delay: 500,
  })

  return (
    <Slide title="Lights and Materials" {...props}>
      <SlideBody color={textSpring.color} bullet fontSize={0.25}>
        <SlideText onClick={() => window.open('https://threejs.org/docs#AmbientLight')}>
          AmbientLight
        </SlideText>
        <SlideText onClick={() => window.open('https://threejs.org/docs#DirectionalLight')}>
          DirectionalLight
        </SlideText>
        <SlideText onClick={() => window.open('https://threejs.org/docs#HemisphereLight')}>
          HemisphereLight
        </SlideText>
        <SlideText onClick={() => window.open('https://threejs.org/docs#PointLight')}>
          PointLight
        </SlideText>
        <SlideText onClick={() => window.open('https://threejs.org/docs#RectAreaLight')}>
          RectAreaLight
        </SlideText>
        <SlideText onClick={() => window.open('https://threejs.org/docs#SpotLight')}>
          SpotLight
        </SlideText>
      </SlideBody>

      <SlideBody color={textSpring.color} position={[4, 0, 2.8]} fontSize={0.3}>
        <SlideText onClick={() => window.open(`https://threejs.org/docs#${materialId}`)}>
          {materialId}
        </SlideText>
      </SlideBody>

      <SlideBody color={textSpring.color} position={[3.6, 0, 1.8]}>
        <SlideText>👆</SlideText>
      </SlideBody>

      <SpotLight
        position={[2, 3, 2]}
        angle={0.3}
        penumbra={0.5}
        intensity={2}
        decay={0.5}
        castShadow
      />

      <Hoverable>
        <Box position-y={0.5} material={material} onClick={() => setToggle(!toggleMaterial)} />
      </Hoverable>
    </Slide>
  )
}
