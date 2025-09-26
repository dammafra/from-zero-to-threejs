import useDebug from '@hooks/use-debug'
import { Leva } from 'leva'
import { StrictMode } from 'react'
import Experience from './components/Experience'

export default function App() {
  const debug = useDebug()

  return (
    <>
      <Leva hidden={!debug} theme={{ sizes: { rootWidth: '350px' } }} />

      <StrictMode>
        <Experience />
      </StrictMode>
    </>
  )
}
