import { Slide, type SlideProps } from '@components'
import { useOverlay } from '@stores'
import { useEffect } from 'react'

export function Examples(props: SlideProps) {
  const setLogo = useOverlay(s => s.setLogo)

  useEffect(() => {
    setLogo({ position: [0, 0, 0], rotation: [0, 0, 0], scale: 0 })
  }, [setLogo])

  return <Slide background={false} {...props} />
}
