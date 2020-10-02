import React, {useState} from 'react'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ViewMore from './ViewMore'


const useStyles = makeStyles((theme) => ({
    gridList: {
        'boxSizing': 'border-box',
        'flex': 1,
        'minWidth': '30%',
        'borderRadius': '5px',
        'margin': '5px',
        'padding': '5px',
        'backgroundColor': '#f7f7f7',
        'textAlign': 'left',
        'cursor' : 'pointer'
    },
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
        'lineHeight': '20px',
        'height': '40px'
    }
}));


function Notes(props) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedNote, setSelectedNote] = useState(null)
    const handleOpen=(value)=>{
        setIsOpen(true);
        setSelectedNote(value)
    }
    const handleClose=()=>{
        setIsOpen(false);
    }
    function NotesRendering() {
        const classes = useStyles();
        if (props.notes) {
            let arrayToFilter = Object.values(props.notes).slice(0).reverse();
            if (props.searchInput){
                arrayToFilter = arrayToFilter.filter(item => {
                return item.mText.includes(props.searchInput) || item.mSubject.includes(props.searchInput)
            })}
            return arrayToFilter.map((note,index)=> {
                return (

                    <GridListTile onClick={()=>handleOpen(arrayToFilter[index])} cols={1} key={note.mNoteId} className={classes.gridList}>
                        <div>
                            <div className={classes.title}>{note.mSubject}</div>
                            <div className={classes.text}>{note.mText.slice(0, 30)}...</div>
                            <div className={classes.date}>
                                {note.mDate}
                            </div>
                        </div>
                    </GridListTile>


                )
            })
        } else {
            return (
                <p>You have no notes</p>
            )
        }

    }
    return (
        <>
            {NotesRendering()}
            {isOpen && <ViewMore onClose={handleClose} open={isOpen} selectedNote={selectedNote}/>}
        </>
    )
}

Notes.propTypes = {

}

export default Notes

