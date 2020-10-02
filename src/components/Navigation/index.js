import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';
import * as ROUTES from './../../constants/routes';
import * as TRANSLATIONS from '../../constants/translations';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

/**
 * 
 * @param {authUser} param0 
 * display different navigation bar.
 * We get the authUser from the Context
 */
const Navigation = ({ authUser }) => (
    <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <NavigationAuth authUser={authUser}/> : <NavigationNonAuth />
    }
    </AuthUserContext.Consumer>
  );

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      color: '#321c92'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center'
    },
    logo: {
      height: '50px'
    },
    menuLinks: {
      color: 'black',
      textDecoration: 'none'
    }
    }
  ));

  //TODO add reset password functionality


 
  const NavigationAuth = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          <img src="/logo.png" alt="logo" className={classes.logo}/>
            <span> <Link className="nav-links" to={ROUTES.HOME}>{TRANSLATIONS.APPNAME}</Link></span>
          </Typography>
          <div>
            <div aria-controls="simple-menu" className="nav-links" aria-haspopup="true" onClick={handleClick}>
              <MenuIcon/>
            </div>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}><Link to={ROUTES.ACCOUNT} className={classes.menuLinks}>Account</Link></MenuItem>
              <MenuItem onClick={handleClose}><SignOutButton className={classes.menuLinks}/></MenuItem>
            </Menu>
          </div>
          
          
        </Toolbar>
      </AppBar>
    </div>
    )
  };
   
  const NavigationNonAuth = () => {
    const classes = useStyles();
    return (
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          <img src="/logo.png" alt="logo"  className={classes.logo}/>
            <span> {TRANSLATIONS.APPNAME}</span>
          </Typography>
          <Link className="nav-links" to={ROUTES.SIGN_IN}>Sign In</Link>
          <Link className="nav-links" to={ROUTES.SIGN_UP}>Sign Up</Link>
        </Toolbar>
      </AppBar>
    </div>
    )
  };
 
export default Navigation;