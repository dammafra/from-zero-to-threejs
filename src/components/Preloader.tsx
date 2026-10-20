import {
  Book,
  Books,
  Camera,
  Chair,
  Clock,
  Console,
  Desk,
  Guitar,
  Headphones,
  Headset,
  Macbook,
  Popcorn,
  Ruler,
  Stage,
  Target,
  ThreeLogo,
  WebGLLogo,
} from '@components/models'
import { useMixamoAnimation } from '@hooks'
import { Text, Text3D, useFont, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { setupAvatar, textCharacters, textFonts } from '@utils'
import { use, useEffect, useRef, useState, type PropsWithChildren } from 'react'
import { type Group } from 'three'
import { Loader } from './Loader'

const images = [
  '/images/bruno.png',
  '/images/chartogne.png',
  '/images/cornrevolution.png',
  '/images/drysland.png',
  '/images/linktree.png',
  '/images/lumen.png',
  '/images/messenger.png',
]

// Decoded <img> are kept referenced so the browser keeps them warm
const decodedImages = images.map(src => Object.assign(new Image(), { src }))
const imagesPromise = Promise.all(decodedImages.map(image => image.decode().catch(() => {})))

/**
 * Keeps the Loader on screen until every asset is downloaded and every shader is compiled,
 * so changing slide never has to wait for (or stutter on) a first-time load.
 */
export function Preloader({ children }: PropsWithChildren) {
  const { gl, camera, scene } = useThree()

  const avatar = useGLTF('/models/avatar.vrm')
  const vrm = setupAvatar(avatar)
  useMixamoAnimation('/models/walking.fbx', vrm)
  useMixamoAnimation('/models/waving.fbx', vrm)

  useFont('/fonts/audiowide.json')
  use(imagesPromise)

  const warmupRef = useRef<Group>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!warmupRef.current) return

    let cancelled = false
    Promise.all([
      gl.compileAsync(warmupRef.current, camera, scene),
      gl.compileAsync(avatar.scene, camera, scene),
    ]).then(() => !cancelled && setReady(true))

    return () => {
      cancelled = true
    }
  }, [gl, camera, scene, avatar])

  if (ready) return children

  return (
    <>
      <Loader />

      {/* Never rendered: only mounted to compile its shaders against the scene lights */}
      <group ref={warmupRef} visible={false}>
        <Book />
        <Books />
        <Camera />
        <Chair />
        <Clock />
        <Console />
        <Desk />
        <Guitar />
        <Headphones />
        <Headset />
        <Macbook />
        <Popcorn />
        <Ruler />
        <Stage />
        <Target />
        <ThreeLogo />
        <WebGLLogo />

        {Object.values(textFonts).map(font => (
          <Text key={font} font={font} characters={textCharacters}>
            {textCharacters}
            <meshBasicMaterial transparent />
          </Text>
        ))}

        <Text3D font="/fonts/encode-sans.json" castShadow>
          a
          <meshMatcapMaterial />
        </Text3D>
      </group>
    </>
  )
}
