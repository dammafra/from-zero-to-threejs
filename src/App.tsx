import Experience from '@components/Experience'
import PresentationControls from '@components/PresentationControls'
import useDebug from '@hooks/use-debug'
import { Leva } from 'leva'
import { StrictMode } from 'react'

export default function App() {
  const debug = useDebug()

  return (
    <>
      <Leva hidden={!debug} theme={{ sizes: { rootWidth: '350px' } }} />

      {/* See https://github.com/pmndrs/leva/issues/552 */}
      <StrictMode>
        <Experience />
        <PresentationControls />
      </StrictMode>
    </>
  )
}
