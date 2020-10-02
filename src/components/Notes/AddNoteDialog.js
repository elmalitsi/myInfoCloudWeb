import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import * as TRANSLATIONS from '../../constants/translations'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import uuid from 'react-uuid'
import moment from 'moment';

function AddNoteDialog(props) {
    const { open } = props;
    const [noteSubject, setNoteSubject] = useState(null)
    const [noteText, setNoteText] = useState(null)
    const [error, setError] = useState(null)
    function writeNewPost(noteText, noteSubject) {
        // post entry.
        var postData = {
            mDate: moment().format('DD/MM/YYYY HH:mm'),
            mNoteId: -Date.now(),
            mSubject: noteSubject,
            mText: noteText,
        };
        props.firebaseNotes(props.authId).push(postData)
        props.onClose();
        props.isSubmitted(true)
      }

    const onSubmit = event => {
        if (noteText && noteSubject){
            //add note to firebase here
            writeNewPost(noteText, noteSubject)
            event.preventDefault();
        }else{
            setError('Please fill required fields')
        }
      };
    
    const onChange = event => {
        setError(null)
        if (event.target.name === 'noteSubject'){
            setNoteSubject(event.target.value)
        }else{
            setNoteText(event.target.value)
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
                        id="noteSubject"
                        label={TRANSLATIONS.NOTESUBJECT}
                        value={noteSubject}
                        name="noteSubject"
                        variant="outlined"
                        onChange={onChange}>
                    </TextField>
                    <TextField
                        error={error && true}
                        required
                        className='input'
                        id="noteText"
                        label={TRANSLATIONS.NOTETEXT}
                        value={noteText}
                        name="noteText" 
                        variant="outlined"
                        type="noteText" 
                        onChange={onChange}>
                    </TextField>
                </form>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Button variant="contained" className="btn btn-primary" onClick={onSubmit} color="primary">
                            Add Note
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

        </Dialog>
    );
}

AddNoteDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default AddNoteDialog