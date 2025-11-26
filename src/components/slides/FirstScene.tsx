import { Frame, Slide, type SlideProps } from '@components'

export function FirstScene(props: SlideProps) {
  return (
    <Slide title="Prima scena" {...props}>
      <Frame position={[2, 1.5, 1]} />
    </Slide>
  )
}
