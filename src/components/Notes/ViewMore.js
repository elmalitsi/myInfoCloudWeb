import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';


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
function ViewMore(props) {
    const classes = useStyles();
    const { open, selectedNote } = props;

    return (
        <Dialog className="note-dialog" aria-labelledby="simple-dialog-title" open={open}>
        <div>
            <div className={classes.title}>{selectedNote.mSubject}</div>
            <hr></hr>
            <div className={classes.text}>{selectedNote.mText}</div>
            <div className={classes.date}>
                {selectedNote.mDate}
            </div>
        </div>
        <CloseIcon className='close-icon' onClick={props.onClose} />
        </Dialog>
    );
}

ViewMore.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default ViewMore