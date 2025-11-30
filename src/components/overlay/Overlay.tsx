import { DemoFrame } from '@components/DemoFrame'
import { OverlayExamples } from './OverlayExamples'
import { OverlayLogo } from './OverlayLogo'

export interface OverlayProps {
  show?: boolean
  index: number
}

export function Overlay({ show, index }: OverlayProps) {
  return (
    show && (
      <>
        <OverlayLogo index={index} />
        <OverlayExamples index={index} />
        <DemoFrame index={index} />
      </>
    )
  )
}
