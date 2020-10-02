import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import CallMadeIcon from '@material-ui/icons/CallMade';
import ViewMore from './ViewMore';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    incoming: {
        color: 'green'
      },
      outgoing:{
        color: 'blue'
    },
    listItem:{
      border: 'solid #cacfe5 2px',
      borderRadius: '10px',
      margin: '3px 0px',
      cursor: 'pointer'
    }
}));

function Messages(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMessage,setSelectedMessage] = useState(null)
    const handleOpen=(value)=>{
        setIsOpen(true)
        setSelectedMessage(value)
    }
    const handleClose=()=>{
        setIsOpen(false)
        setSelectedMessage(null)
    }
    const classes = useStyles();
    let messages, contactName, contactNumber, messageType, contactRegion
    if (props.messages) {
        let arrayToFilter = Object.values(props.messages).slice(0).reverse();
        if (props.searchInput){
            arrayToFilter = arrayToFilter.filter(item => {
            return item.mMessagePerson.mMessageNumber.includes(props.searchInput) || item.mText.includes(props.searchInput) || item.mMessagePerson.mContactName.includes(props.searchInput)
        })}
        messages =  arrayToFilter.map((message,index) => {
            contactNumber = message.mMessagePerson.mMessageNumber;
            contactName = contactNumber
            contactRegion = message.mMessagePerson.mContactRegion
            if (message.mMessagePerson.mContactName){
                contactName = message.mMessagePerson.mContactName
            }

            if (message.mType === 'outgoing'){
                messageType = <CallMadeIcon className={classes.outgoing}/>
            }else{
                messageType = <CallReceivedIcon className={classes.incoming}/>
            }
            return (
                <ListItem key={message.mMessageId} alignItems="flex-start" onClick={()=>handleOpen(arrayToFilter[index])} className={classes.listItem}>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/unknownPerson_img.jpg" />
                    </ListItemAvatar>
                    <div className="flex-list">
                        <div className="item-left">
                        <div className="contact-name">
                            {contactName}
                        </div>
                        <div className="contact-number">
                            {message.mText}
                        </div>
                        </div>
                        <div className="item-right">
                            <div>
                                {messageType}
                            </div>
                            <div>
                                {message.mDate}
                            </div>
                        </div>
                    </div>
                </ListItem>
                )
        });
    } else{
        messages = <CircularProgress disableShrink />
    }
    return (
        <>
            <List className={classes.root}>
                {messages}
            </List>
            {isOpen && <ViewMore onClose={handleClose} open={isOpen} selectedMessage={selectedMessage}/>}
        </>
    )
}

export default Messages