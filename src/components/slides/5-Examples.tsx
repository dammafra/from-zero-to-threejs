import { Frame, FrameLoader, Slide, type SlideProps } from '@components'
import { useIsTouch } from '@hooks'
import { useSprings } from '@react-spring/three'
import { useOverlay } from '@stores'
import { useEffect } from 'react'
import type { Vector3Tuple } from 'three'

export function Examples(props: SlideProps) {
  const isTouch = useIsTouch()

  const setLogo = useOverlay(s => s.setLogo)
  const setDemo = useOverlay(s => s.setDemo)

  useEffect(() => {
    setLogo({ position: [0, 0, 0], rotation: [0, 0, 0], scale: 0 })
    setDemo(undefined)
  }, [setLogo, setDemo])

  const examples = [
    { image: '/images/drysland.png', url: 'https://drysland.vercel.app' },
    // { image: '/images/hook-a-fish.png', url: 'https://hook-a-fish.vercel.app' },
    { image: '/images/bruno.png', url: 'https://bruno-simon.com' },
    { image: '/images/chartogne.png', url: 'https://chartogne-taillet.com' },
    { image: '/images/cornrevolution.png', url: 'https://cornrevolution.resn.global' },
    { image: '/images/lumen.png', url: 'https://lumen-decor-studio.vercel.app' },
    { image: '/images/messenger.png', url: 'https://messenger.abeto.co' },
  ]

  const [examplesSprings] = useSprings(6, i => {
    const positionsFrom: Vector3Tuple[] = [
      [-20, 0, 0],
      [0, 0, -20],
      [20, 0, 0],
      [-20, 0, 0],
      [0, 0, 20],
      [20, 0, 0],
    ]

    const positionsTo: Vector3Tuple[] = [
      [-3.2, 0, -1.5],
      [0, 0, -1.5],
      [3.2, 0, -1.5],
      [-3, 0, 1.5],
      [0, 0, 1.5],
      [3, 0, 1.5],
    ]

    return {
      from: { position: positionsFrom.at(i), scale: 0.001 },
      to: { position: positionsTo.at(i), scale: i < 3 ? 1 : 0.9 },
      delay: 250,
    }
  })

  return (
    <Slide background={false} {...props}>
      {examplesSprings.map((spring, i) => (
        <Frame
          key={`example-${i}`}
          onDoubleClick={() => window.location.assign(examples.at(i)!.url)}
          onClick={() => isTouch && window.location.assign(examples.at(i)!.url)}
          {...spring}
        >
          <FrameLoader src={examples.at(i)!.image} className="size-full object-cover" />
        </Frame>
      ))}
    </Slide>
  )
}
