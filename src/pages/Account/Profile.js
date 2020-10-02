import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { withFirebase } from '../../components/Firebase';
import UploadImageDialog from './UploadImageDialog';
import Grid from '@material-ui/core/Grid';
import Map from './Map';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditInfo from './EditInfo';
import ResetPassword from './ResetPassword';



const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: 'auto'
    },
    map: {
        height: '500px',
        width: '500px',
        marginTop: '0px'
    },
    container: {
        marginTop: '50px'
    }
});

function Profile(props) {
    const classes = useStyles();
    const [userInfo, setUserInfo] = useState(null);
    const [open, setOpen] = useState(false);
    const [openPass, setOpenPass] = useState(false);
    useEffect(() => {
        props.firebase.userInfo(props.authUser.uid).on('value', snapshot => {
            const info = snapshot.val();
            setUserInfo(info)
        })
        return () => {
        };
    }, []);

    if (userInfo === null) {
        return <p>No info</p>
    }


    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = (picture) => {
        setOpen(false);
      };

    const onResetHandleOpen = () => {
        setOpenPass(true)
    }

    const onResetHandleClose = () => {
        setOpenPass(false)
    }

    return (
        <>
            <Grid container spacing={2} className={classes.container}>
                <Grid item xs={6}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            {userInfo.mPhotoUrl ?
                                <CardMedia
                                    component="img"
                                    alt="Profile Picture"
                                    height="340"
                                    image={userInfo.mPhotoUrl}
                                    title="Profile Picture"
                                />
                                :
                                <CardMedia
                                    component="img"
                                    alt="Profile Picture"
                                    height="340"
                                    image={`/unknownPerson_img.jpg`}
                                    title="Profile Picture"
                                />
                            }

                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">{userInfo.mFirstName} {userInfo.mLastName}</Typography>
                                <Typography variant="body2" color="textSecondary" component="p">{userInfo.mAllSimNumbers[0]}</Typography>
                                <Typography variant="body2" color="textSecondary" component="p">{userInfo.mEmail}</Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" onClick={handleClickOpen}>
                                Edit Info
                            </Button>
                            <Button  size="small" onClick={onResetHandleOpen} color="primary">
                                Reset Password
                            </Button>
                            <EditInfo open={open} user={userInfo} onClose={handleClose} firebaseUserInfo={props.firebase.userInfo} authId={props.authUser.uid}/>
                            <ResetPassword open={openPass} onClose={onResetHandleClose}/>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Map className={classes.map} location={userInfo.mLastLocation}/>
                </Grid>
            </Grid>
        </>
    )
}

Profile.propTypes = {

}

export default withFirebase(Profile)

