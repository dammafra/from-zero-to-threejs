import { OverlayDemo } from './OverlayDemo'
import { OverlayExamples } from './OverlayExamples'
import { OverlayLogo } from './OverlayLogo'

export interface OverlayProps {
  index: number
}

export function Overlay({ index }: OverlayProps) {
  return (
    <>
      <OverlayLogo index={index} />
      <OverlayExamples index={index} />
      <OverlayDemo index={index} />
    </>
  )
}
