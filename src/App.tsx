import { PropsWithChildren } from 'react'
import { DevicesProvider } from './providers/DevicesProvider'
import { Router } from './router'

function Providers({ children }: PropsWithChildren<{}>) {
  return <DevicesProvider>{children}</DevicesProvider>
}

function App() {
  return (
    <Providers>
      <h1>Embed lab project</h1>
      <Router />
    </Providers>
  )
}

export default App
