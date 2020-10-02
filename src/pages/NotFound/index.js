import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';

function NotFound(props) {
    const [navigate, setNavigate] = useState(false)

    function handleClick() {
        setNavigate(true)
    }
    if (navigate) {
        return <Redirect to="/signin" push={true} />
        }
    return (
        <div className="container-404">
            <div className="number">404</div>
            <div className="text-404">The page that you are looking for doesn't exists</div>
            <Button onClick={handleClick} variant="contained" className="btn" color="primary">
                Sign in
            </Button>
        </div>
    )
}

NotFound.propTypes = {

}

export default NotFound

