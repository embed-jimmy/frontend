import { PropsWithChildren } from 'react'
import { LoadingOverlay } from './components/LoadingOverlay'
import { DeviceProvider } from './providers/DeviceProvider'
import { LoadingProvider } from './providers/LoadingProvider'
import { Router } from './router'

function Providers({ children }: PropsWithChildren<{}>) {
  return (
    <LoadingProvider>
      <DeviceProvider>{children}</DeviceProvider>
    </LoadingProvider>
  )
}

function App() {
  return (
    <Providers>
      <h1>Embed lab project</h1>
      <Router />
      <LoadingOverlay />
    </Providers>
  )
}

export default App
