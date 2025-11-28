import { Experience, PresentationControls } from '@components'
import { DemoFull } from '@components/DemoFull'
import { DoubleTapPreventer, GUI } from '@components/helpers'
import { StrictMode } from 'react'
import { Redirect, Route, Switch } from 'wouter'

export default function App() {
  return (
    <>
      <GUI />
      <DoubleTapPreventer />

      <StrictMode>
        <Experience />
        <Switch>
          <Route path="/slides/:index?" component={PresentationControls} />
          <Route path="/demo/:src" component={DemoFull} />
          <Route>
            <Redirect to="/slides/0" />
          </Route>
        </Switch>
      </StrictMode>
    </>
  )
}
