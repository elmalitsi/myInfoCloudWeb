import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CallMadeIcon from '@material-ui/icons/CallMade';
import CallReceivedIcon from '@material-ui/icons/CallReceived';


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
    },
    missed: {
        color: 'red'
      },
      incoming: {
        color: 'green'
      },
      outgoing:{
        color: 'blue'
    },
}));
function ViewMore(props) {
    const classes = useStyles();
    const { open, selectedMessage } = props;

    let messageType, contactName, contactNumber, email, region
    messageType = selectedMessage.mType
    if (messageType === 'outgoing'){
        messageType =  <CallMadeIcon className={classes.outgoing}/>
    }else {
        messageType = <CallReceivedIcon className={classes.incoming}/>
    }

    contactNumber = selectedMessage.mMessagePerson.mMessageNumber
    contactName = contactNumber
    if (selectedMessage.mMessagePerson.mContactName){
        contactName = selectedMessage.mMessagePerson.mContactName
    }
    email = 'Not Found'
    region = 'Not Found'
    if (selectedMessage.mMessagePerson.mContactEmail){
        email = selectedMessage.mMessagePerson.mContactEmail
    }

    if (selectedMessage.mMessagePerson.mCountry){
        region = selectedMessage.mMessagePerson.mCountry
    }

    return (
        <Dialog className="custom-note-dialog" aria-labelledby="simple-dialog-title" open={open}>
        <div className="dialog">
                <div className="top-section">
                    <div className="top-info-center">
                        <ListItemAvatar>
                            <Avatar style={{"margin-left":"11px"}} alt="user" src="/unknownPerson_img.jpg" />
                        </ListItemAvatar>
                        <div>{contactName}</div>
                    </div>
                </div>
                <div className="bottom-section">
                    <div className="call-number"><div className="dialog-label">Number :</div><div className="dialog-info">{contactNumber}</div></div>
                    <div className="call-info">
                        <div>{messageType}</div>
                        <div className="dialog-info date">{selectedMessage.mDate}</div>
                    </div>
                    <div className="more-info"><div className="dialog-label">Message :</div><div className="dialog-info">{selectedMessage.mText}</div></div>
                    <div className="more-info"><div className="dialog-label">Email :</div><div className="dialog-info">{email}</div></div>
                    <div className="more-info"><div className="dialog-label">Region :</div><div className="dialog-info">{region}</div></div>
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