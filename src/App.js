import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Navigation from './components/Navigation/index';
import LandingPage from './pages/Landing/Landing';
import SignUp from './components/SignUp';
import SingIn from './components/SignIn';
import Account from './pages/Account'
import NotFound from './pages/NotFound'
import Search from './pages/Search'

import * as ROUTES from './constants/routes';
import { withAuthentication } from './components/Session';

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={SingIn} />
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
          <Route exact path={ROUTES.SIGN_IN} component={SingIn} />
          <Route exact path={ROUTES.ACCOUNT} component={Account} />
          <Route exact path={ROUTES.HOME} component={LandingPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )

}

export default withAuthentication(App);