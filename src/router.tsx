import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import { DeviceDashboardPage } from './pages/dashboard'

export function Router() {
  return (
    <BrowserRouter>
      <Route path="/" exact>
        <Redirect to="/dashboard" />
      </Route>
      <Route path="/dashboard" component={DeviceDashboardPage} />
    </BrowserRouter>
  )
}
