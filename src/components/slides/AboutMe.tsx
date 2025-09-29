import { Avatar } from '@components/models'
import type { SlideProps } from '@components/Slide'
import Slide from '@components/Slide'

export function AboutMe(props: SlideProps) {
  return (
    <Slide title="Chi sono" {...props}>
      <Avatar position={[2, 0.02, 0]} />
    </Slide>
  )
}
