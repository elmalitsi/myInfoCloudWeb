import React , {useState , useEffect} from 'react';
import PropTypes from 'prop-types';
import Tabs from './../../components/Navigation/Tabs';
import {withFirebase} from '../../components/Firebase';
import { AuthUserContext, withAuthorization } from '../../components/Session';
import LandingPageAuth from './LandingPageAuth'
import LandingPageNonAuth from './LandingPageNonAuth'


function Landing(props) {
    return (
        <AuthUserContext.Consumer>
            {authUser =>
            authUser ? <LandingPageAuth authUser={authUser} /> : <LandingPageNonAuth />
            }
        </AuthUserContext.Consumer>
    )
}

Landing.propTypes = {

}

export default withFirebase(Landing)



