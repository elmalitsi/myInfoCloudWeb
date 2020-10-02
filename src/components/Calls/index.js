import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ViewMore from './ViewMore'
import CallMissedIcon from '@material-ui/icons/CallMissed';
import CallMadeIcon from '@material-ui/icons/CallMade';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
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
  listItem:{
    border: 'solid #cacfe5 2px',
    borderRadius: '10px',
    margin: '3px 0px',
    cursor: 'pointer'
  }
}));

function Calls(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCall,setSelectedCall] = useState(null)
  const handleOpen=(value)=>{
      setIsOpen(true)
      setSelectedCall(value)
  }
  const handleClose=()=>{
      setIsOpen(false)
      setSelectedCall(null)
  }
  const classes = useStyles();
    let calls , contactName , contactNumber , callType
    if (props.calls){
      let arrayToFilter = Object.values(props.calls).slice(0).reverse();
      if (props.searchInput){
          arrayToFilter = arrayToFilter.filter(item => {
          return item.mCallPerson.mContactName.includes(props.searchInput) || item.mCallPerson.mCallNumber.includes(props.searchInput)
      })}
      calls = arrayToFilter.map((call,index) => {
        contactName = call.mCallPerson.mCallNumber
        if (call.mCallPerson.mContactName){
          contactName = call.mCallPerson.mContactName
        }
        contactNumber = call.mCallPerson.mCallNumber
        if (call.mType === 'missed'){
          callType = <CallMissedIcon className={classes.missed}/>
        }else if (call.mType === 'outgoing'){
          callType =  <CallMadeIcon className={classes.outgoing}/>
        }else {
          callType = <CallReceivedIcon className={classes.incoming}/>
        }

        return (
            <ListItem alignItems="flex-start" key={call.mCallId} onClick={()=>handleOpen(arrayToFilter[index])} className={classes.listItem}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/unknownPerson_img.jpg" />
              </ListItemAvatar>
              <div className="flex-list">
                <div className="item-left">
                  <div className="contact-name">
                    {contactName}
                  </div>
                  <div className="contact-number">
                    {contactNumber}
                  </div>
                </div>
                <div className="item-right">
                    <div>
                      {callType}
                    </div>
                    <div>
                      {call.mDate}
                    </div>
                </div>
              </div>
            </ListItem>
          )
      });
    }else{
      calls = <CircularProgress disableShrink />
    }

  return (
    <>
      <List className={classes.root}>
        {calls}
      </List>
      {isOpen && <ViewMore onClose={handleClose} open={isOpen} selectedCall={selectedCall}/>}
    </>
  )
}

export default Calls
