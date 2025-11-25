import { Experience, PresentationControls } from '@components'
import { DoubleTapPreventer, GUI } from '@components/helpers'

export default function App() {
  return (
    <>
      <GUI />
      <DoubleTapPreventer />

      {/* <StrictMode> */}
      <Experience />
      <PresentationControls />
      {/* </StrictMode> */}
    </>
  )
}
