import { DemoFrame } from '@components/DemoFrame'
import { OverlayLogo } from './OverlayLogo'

export interface OverlayProps {
  show?: boolean
  index: number
}

export function Overlay({ show, index }: OverlayProps) {
  return (
    show && (
      <>
        <OverlayLogo />
        <DemoFrame index={index} />
      </>
    )
  )
}
