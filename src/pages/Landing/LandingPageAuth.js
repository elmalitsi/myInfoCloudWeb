import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { withFirebase } from '../../components/Firebase';
import { fade, makeStyles } from '@material-ui/core/styles';
import Calls from '../../components/Calls';
import Messages from '../../components/Messages';
import Notes from '../../components/Notes'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CallIcon from '@material-ui/icons/Call';
import CreateIcon from '@material-ui/icons/Create';
import AddNoteDialog from '../../components/Notes/AddNoteDialog';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Alert from '@material-ui/lab/Alert';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    svgAddNote:{
        'fontSize': '20px',
        'color': '#c77171',
        'position': 'absolute',
        'top': '50%',
        'left': '50%',
        'marginRight': '-50%',
        'transform': 'translate(-50%, -50%)'
    },
    gridlistRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      },
      gridFirst: {
        'textAlign': 'center',
        'border': 'dashed 3px #3f51b5',
        'position': 'relative',
        'cursor': 'pointer',
        'borderRadius':'5px'
      },
      alert:{
        'position': 'absolute',
        'bottom': '10%',
        'left': '45%'
      },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',

      },
        border: 'solid 1px #321c92',
        marginBottom: '40px',
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    searchContainer: {
        maxWidth: '500px',
        margin: 'auto'
    }
}));

function LandingPageAuth(props) {
    const [Isloading, setIsLoading] = useState(true);
    const [isActive, setIsActive] = useState('calls');
    const [calls, setCalls] = useState(null);
    const [messages, setMessages] = useState(null);
    const [notes, setNotes] = useState(null);
    const [showNoteDialog, setShowNoteDialog] = useState(false)
    const [submitted, setSubmitted] = useState(null)
    const [newCall, setNewCall] = useState(false)
    const [newMessage, setNewMessage] = useState(false)
    const [newNote, setNewNote] = useState(false)
    const [searchInput, setSearchInput] = React.useState(null)

    useEffect(() => {
        props.firebase.calls(props.authUser.uid).on('value', snapshot => {
            const calls = snapshot.val();
            setIsLoading(false)
            setCalls(calls)
            setNewCall(true)
            setTimeout(() => {
                setNewCall(false)
            }, 3000)
        })
        return () => {
        };
    }, []);

    useEffect(() => {
        props.firebase.messages(props.authUser.uid).on('value', snapshot => {
            const messages = snapshot.val();
            setIsLoading(false)
            setMessages(messages)
            setNewMessage(true)
            setTimeout(() => {
                setNewMessage(false)
            }, 3000)
        })
        return () => {
        };
    }, []);

    useEffect(() => {
        props.firebase.notes(props.authUser.uid).on('value', snapshot => {
            const notes = snapshot.val();
            setIsLoading(false)
            setNotes(notes)
            setNewNote(true)
            setTimeout(() => {
                setNewNote(false)
            }, 3000)
        })
        return () => {
        };
    }, []);


    const classes = useStyles();

    const handleActiveTab=(activeTab)=>{
        setIsActive(activeTab)
    }

    const AddNote = () =>{
        setShowNoteDialog(true)
    }

    const noteIsSubmitted = (value) =>{
        setSubmitted(value)
        setTimeout(() => {
            setSubmitted(null)
          }, 5000)
    }

    const handleClose = () =>{
        setShowNoteDialog(false)
    }
  
    const handleChange = (event) =>{
    setSearchInput(event.target.value)
    }

    const clearInput = () => {
        setSearchInput('')
    }

    return (
        <>
            <div className="margin-top-20">
            <Grid container spacing={3}>
                <Grid item xs={12} className={classes.searchContainer}>
                    <div className={classes.search} onChange={handleChange}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        value={searchInput}
                        inputProps={{ 'aria-label': 'search' }}
                        />
                        <div className="clear-search">
                            <CloseIcon onClick={clearInput}/>
                        </div>
                    </div>
                </Grid>
            </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <List component="nav" className={classes.root} aria-label="mailbox folders">
                                <ListItem button className={isActive ==='calls' && 'active'} onClick={()=>handleActiveTab('calls')}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <CallIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Calls" />
                                </ListItem>
                                <Divider />
                                <ListItem button divider className={isActive ==='messages' && 'active'} onClick={()=>handleActiveTab('messages')}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <MailOutlineIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Messages" />
                                </ListItem>
                                <ListItem button className={isActive ==='notes' && 'active'} onClick={()=>handleActiveTab('notes')}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <CreateIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Notes" />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={9} className={isActive ==='calls' ? 'active' : 'hide'}>
                        <Paper className={classes.paper}>
                            <div>
                                <Calls calls={calls} Isloading={Isloading} searchInput={searchInput}/>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={9} className={isActive ==='messages' ? 'active' : 'hide'}>
                        <Paper className={classes.paper}>
                            <div>
                                <Messages messages={messages} Isloading={Isloading} searchInput={searchInput}/>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={9} className={isActive ==='notes' ? 'active' : 'hide'} style={{position:"relative"}}>
                        <Paper className={classes.paper}>
                            <div>
                                <GridList cellHeight={160} className={classes.gridlistRoot}  cols={3}>
                                    <GridListTile cols={1} className={classes.gridFirst}>
                                        <div className={classes.svgAddNote}  onClick={()=>AddNote()}>
                                            <AddCircleOutlineIcon/>
                                            <div>Add new Note</div>
                                        </div>
                                    </GridListTile>
                                    {notes && <Notes notes={notes} Isloading={Isloading} searchInput={searchInput}/>}
                                </GridList>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                <AddNoteDialog open={showNoteDialog} onClose={handleClose} firebaseNotes={props.firebase.notes} authId={props.authUser.uid} isSubmitted={noteIsSubmitted}/>
                {submitted && <Alert className={classes.alert} severity="success">Notes were Updated!</Alert>}
                {submitted===false && <Alert className={classes.alert} severity="error">Something went wrong!</Alert>}
                {(newCall || newMessage || newNote) && <Alert className={classes.alert} severity="success">Lists were successfully Updated!!</Alert>}
            </div>


        </>
    )
}

LandingPageAuth.propTypes = {

}

export default withFirebase(LandingPageAuth)

