import { Slide, type SlideProps } from '@components'
import { Avatar } from '@components/models'

export function AboutMe(props: SlideProps) {
  return (
    <Slide title="Francesco Dammacco" {...props}>
      <Avatar position={[2, 0.02, 1]} scale={1.5} />
    </Slide>
  )
}
