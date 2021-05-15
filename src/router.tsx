import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { RedirectFirstDevicePage } from './pages/redirect-first-device'
import { AddDevicePage } from './pages/device/add'
import { DevicePage } from './pages/device'

export function Router() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={RedirectFirstDevicePage} />
      <Route path="/device">
        <Switch>
          <Route exact path="/device" component={RedirectFirstDevicePage} />
          <Route path="/device/add" component={AddDevicePage} />
          <Route path="/device/:deviceId" component={DevicePage} />
        </Switch>
      </Route>
    </BrowserRouter>
  )
}
