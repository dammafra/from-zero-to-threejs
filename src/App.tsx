import { Experience, PresentationControls } from '@components'
import { DoubleTapPreventer, GUI } from '@components/helpers'
import { StrictMode } from 'react'

export default function App() {
  return (
    <>
      <GUI />
      <DoubleTapPreventer />

      <StrictMode>
        <Experience />
        <PresentationControls />
      </StrictMode>
    </>
  )
}
