import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { withFirebase } from '../../components/Firebase';


const useStyles = makeStyles((theme) => ({
    date: {
        fontSize: '12px',
        color:'#ff8686'
    },
    title:{
        fontSize: '15px',
        fontWeight: '500',
        color:'black'
    },
    text:{
        'fontSize': '15px',
    }
}));
function ResetPassword(props) {
    const classes = useStyles();
    const { open, user } = props;
    const [error, setError] = useState(null)
    const [newPassword, setNewPassword] = useState()
    const [currentPassword, setCurrentPassword] = useState()
    const [retypePassword, setRetypePassword] = useState()
    const [match, setMatch] = useState(null)

    function UpdatePassword(pass) {
        /**USER THIS FOR PASSWORD UPDATE */
        props.firebase.doPasswordUpdate(pass).then(function() {
            props.firebase.doSignOut()
        }).catch(function(error) {
          setError('something went wrong!')
        });
      }



    const onSubmit = event => {
        if (newPassword === retypePassword){
            UpdatePassword(newPassword)
        }else{
            setMatch("Passwords don't match")
        }
        event.preventDefault();
    };


    const onChange = event => {
        setError(null)
        if (event.target.name === 'currentPassword'){
            setCurrentPassword(event.target.value)
        }else if (event.target.name === 'newPassword'){
            setNewPassword(event.target.value)
        }else
            setRetypePassword(event.target.value)
    }


    return (
        <Dialog className="note-dialog" aria-labelledby="simple-dialog-title" open={open}>
            <div>
                <form noValidate autoComplete="off">
                    <TextField
                        error={match && true}
                        required
                        className='input'
                        id="newPassword"
                        label='newPassword'
                        name="newPassword"
                        variant="outlined"
                        type="password"
                        onChange={onChange}>
                    </TextField>
                    <TextField
                        error={match && true}
                        required
                        className='input'
                        id="retypePassword"
                        label='retypePassword'
                        name="retypePassword"
                        variant="outlined"
                        type="password"
                        onChange={onChange}>
                    </TextField>
                </form>
                <p>After you reset your password you will automatically be logged out!</p>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Button variant="contained" className="btn btn-primary" onClick={onSubmit} color="primary">
                            Reset
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" className="btn btn-primary" onClick={props.onClose} color="primary">
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
                {match && <p className="text-align-center red">{match}</p>}
                {error && <p className="text-align-center red">{error}</p>}
                <CloseIcon className='close-icon' onClick={props.onClose} />
            </div>
        <CloseIcon className='close-icon' onClick={props.onClose} />
        </Dialog>
    );
}

ResetPassword.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default withFirebase(ResetPassword)