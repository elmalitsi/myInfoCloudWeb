import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

function SignedInLinks() {
    return (
        <>
            <li>
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </li>
            <li>
                <Link to={ROUTES.LANDING}>Landing</Link>
            </li>
            <li>
                <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
                <Link to={ROUTES.PROFILE}>Account</Link>
            </li>
        </>
    )
}

export default SignedInLinks
