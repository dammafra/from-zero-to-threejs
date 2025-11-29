import { Hoverable } from '@components/helpers'
import { Slide, type SlideProps } from '@components/Slide'
import { SlideBody, SlideText } from '@components/SlideBody'
import { Box, SpotLight } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { Material, MeshBasicMaterial, MeshStandardMaterial } from 'three'

export function Light(props: SlideProps) {
  const basicMaterial = new MeshBasicMaterial({ color: 'red' })
  const standardMaterial = new MeshStandardMaterial({ color: 'red' })

  const [toggle, setToggle] = useState(false)
  const [material, setMaterial] = useState<Material>(basicMaterial)
  const [materialId, setMaterialId] = useState('MeshBasicMaterial')

  useEffect(() => {
    setMaterial(toggle ? standardMaterial : basicMaterial)
    setMaterialId(toggle ? 'MeshStandardMaterial' : 'MeshBasicMaterial')
  }, [toggle])

  return (
    <Slide title="Light e Material" {...props}>
      <SlideBody color="white" bullet fontSize={0.25}>
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

      <SlideBody color="white" position={[4, 0, 2.8]} fontSize={0.3}>
        <SlideText onClick={() => window.open(`https://threejs.org/docs#${materialId}`)}>
          {materialId}
        </SlideText>
      </SlideBody>

      <SlideBody color="white" position={[3.5, 0, 1.8]}>
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
        <Box position-y={0.5} material={material} onClick={() => setToggle(!toggle)} />
      </Hoverable>
    </Slide>
  )
}
