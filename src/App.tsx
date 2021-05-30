import { Container, ThemeProvider } from '@material-ui/core'
import { PropsWithChildren } from 'react'
import { LoadingOverlay } from './components/LoadingOverlay'
import { DeviceProvider } from './providers/DeviceProvider'
import { LoadingProvider } from './providers/LoadingProvider'
import { theme } from './utils/theme'
import styled from '@emotion/styled'
import { DeviceDashboardPage } from './pages/dashboard'

function Providers({ children }: PropsWithChildren<{}>) {
  return (
    <ThemeProvider theme={theme}>
      <LoadingProvider>
        <DeviceProvider>{children}</DeviceProvider>
      </LoadingProvider>
    </ThemeProvider>
  )
}

const AppTitle = styled.h1`
  text-align: center;
`

function App() {
  return (
    <Providers>
      <Container maxWidth="md">
        <AppTitle>Embed lab project</AppTitle>
        <DeviceDashboardPage />
        <LoadingOverlay />
      </Container>
    </Providers>
  )
}

export default App
