import { Example, Slide, type SlideProps } from '@components'

export function FirstScene(props: SlideProps) {
  return (
    <Slide title="Prima scena" {...props}>
      <Example name="scene" position={[2, 1, 1]} visible={props.visible} />
    </Slide>
  )
}
