import Experience from '@components/Experience'
import PresentationControls from '@components/PresentationControls'
import useDebug from '@hooks/use-debug'
import { Leva } from 'leva'

export default function App() {
  const debug = useDebug()

  return (
    <>
      {/* See https://github.com/pmndrs/leva/issues/552 */}
      <Leva hidden={!debug} theme={{ sizes: { rootWidth: '350px' } }} />

      {/* <StrictMode> */}
      <Experience />
      <PresentationControls />
      {/* </StrictMode> */}
    </>
  )
}
