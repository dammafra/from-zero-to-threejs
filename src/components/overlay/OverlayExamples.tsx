import { Frame } from '@components'
import { useSprings } from '@react-spring/three'
import { type Vector3Tuple } from 'three'
import type { OverlayProps } from './Overlay'

export function OverlayExamples({ index }: OverlayProps) {
  const examplesIndex = 5
  const examples = [
    { image: '/images/bruno.png', url: 'https://bruno-simon.com' },
    { image: '/images/chartogne.png', url: 'https://chartogne-taillet.com' },
    { image: '/images/cornrevolution.png', url: 'https://cornrevolution.resn.global' },
    { image: '/images/messenger.png', url: 'https://messenger.abeto.co' },
    { image: '/images/drysland.png', url: 'https://drysland.vercel.app' },
    { image: '/images/hook-a-fish.png', url: 'https://hook-a-fish.vercel.app' },
  ]

  const [examplesSprings] = useSprings(
    6,
    i => {
      const positions: Vector3Tuple[] = [
        [index === examplesIndex ? -3.2 : -20, 0, -1.5],
        [0, 0, index === examplesIndex ? -1.5 : -20],
        [index === examplesIndex ? 3.2 : 20, 0, -1.5],
        [index === examplesIndex ? -3 : -20, 0, 1.5],
        [0, 0, index === examplesIndex ? 1.5 : 20],
        [index === examplesIndex ? 3 : 20, 0, 1.5],
      ]

      return {
        position: positions.at(i),
        scale: index === examplesIndex ? (i < 3 ? 1 : 0.9) : 0.01,
      }
    },
    [index],
  )

  return (
    [examplesIndex - 1, examplesIndex, examplesIndex + 1].includes(index) &&
    examplesSprings.map((spring, i) => (
      <Frame
        key={`example-${i}`}
        onDoubleClick={() => window.location.assign(examples.at(i)!.url)}
        {...spring}
      >
        <img src={examples.at(i)!.image} />
      </Frame>
    ))
  )
}
