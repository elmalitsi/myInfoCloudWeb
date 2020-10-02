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
function EditInfo(props) {
    const classes = useStyles();
    const { open, user } = props;
    const [error, setError] = useState(null)
    const [name, setName] = useState(user.mFirstName)
    const [surname, setSurname] = useState(user.mLastName)
    const [email, setEmail] = useState(user.mEmail)
    const [phone, setPhone] = useState(user.mAllSimNumbers[0])


    function UpdateInfo(name, surname, email, phone) {
        var postData = {
            mEmail: email,
            mFirstName: name,
            mLastName: surname
        };
        props.firebaseUserInfo(props.authId).update(postData)
        props.onClose();
      }



    const onSubmit = event => {
        UpdateInfo(name,surname, email)
        event.preventDefault();
    };


    const onChange = event => {
        setError(null)
        if (event.target.name === 'name'){
            setName(event.target.value)
        }else if (event.target.name === 'surname'){
            setSurname(event.target.value)
        }else if (event.target.name === 'email'){
            setEmail(event.target.value)
        }else{
            setPhone(event.target.value)
        }
    };


    return (
        <Dialog className="note-dialog" aria-labelledby="simple-dialog-title" open={open}>
            <div>
                <form noValidate autoComplete="off">
                    <TextField
                        error={error && true}
                        required
                        className='input'
                        id="name"
                        label='name'
                        value={name}
                        name="name"
                        variant="outlined"
                        onChange={onChange}>
                    </TextField>
                    <TextField
                        error={error && true}
                        required
                        className='input'
                        id="surname"
                        label='surname'
                        value={surname}
                        name="surname"
                        variant="outlined"
                        onChange={onChange}>
                    </TextField>
                    <TextField
                        disabled
                        error={error && true}
                        required
                        className='input'
                        id="email"
                        label='email'
                        value={email}
                        name="email"
                        variant="outlined"
                        onChange={onChange}>
                    </TextField>
                    <TextField
                        error={error && true}
                        required
                        className='input'
                        id="phone"
                        label='phone'
                        value={phone}
                        name="phone"
                        variant="outlined"
                        onChange={onChange}>
                    </TextField>
                </form>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Button variant="contained" className="btn btn-primary" onClick={onSubmit} color="primary">
                            Edit Info
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" className="btn btn-primary" onClick={props.onClose} color="primary">
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
                {error && <p className="text-align-center red">{error}</p>}
                <CloseIcon className='close-icon' onClick={props.onClose} />
            </div>
        <CloseIcon className='close-icon' onClick={props.onClose} />
        </Dialog>
    );
}

EditInfo.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default withFirebase(EditInfo)