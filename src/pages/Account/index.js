import React from 'react';
import { AuthUserContext, withAuthorization } from '../../components/Session';
import { withFirebase } from '../../components/Firebase';
import { compose } from 'recompose';
import Profile from './Profile';
import LandingPageNonAuth from '../../pages/Landing/LandingPageNonAuth'
 
const AccountPage = (props) => {
    return(
      <AuthUserContext.Consumer>
            {authUser =>
              authUser ? <Profile authUser={authUser} /> : <LandingPageNonAuth />
            }
    </AuthUserContext.Consumer>
    )

      };
 
const condition = authUser => !!authUser;
 
export default compose(
  withFirebase,
  withAuthorization(condition))(AccountPage)