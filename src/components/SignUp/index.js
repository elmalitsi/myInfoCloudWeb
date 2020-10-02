import React, { Component } from 'react';
import { Link, withRouter  } from 'react-router-dom';
import { compose } from 'recompose';


import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as TRANSLATIONS from '../../constants/translations';

/** styling **/
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
 
const SignUpPage = () => (
  <>
    <CssBaseline />
    <Container maxWidth="sm" className="container">
      <div className='form'>
    <h1 className="text-align-center">SignUp</h1>
    <SignUpForm/>
    </div>
    </Container>
  </>
);


const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    error: null,
  };
 
class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { firstName, lastName, email, password } = this.state;
 
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        return this.props.firebase
          .user(authUser.user.uid)
          .child('mUserInfo')
          .set({
            mEmail:email,
            mFirstName:firstName,
            mlsFirstSignUp:false,
            mLastLocation:[0,0],
            mLastName:lastName,
            mPhotoUrl: null,
            mUID: authUser.user.uid
          });
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  }
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      error,
    } = this.state;

    /**
     * password check
     */
    const isInvalid =
    password === '' ||
    email === '' ||
    firstName === '' ||
    lastName === '';
 
    return (
      <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
        <TextField 
          className='input' 
          id="firstName" 
          label={TRANSLATIONS.FIRSTNAME} 
          value={firstName}
          name="firstName" 
          variant="outlined"
          onChange={this.onChange}>
        </TextField>
        <TextField 
          className='input' 
          id="lastName" 
          label={TRANSLATIONS.LASTNAME} 
          value={lastName}
          name="lastName" 
          variant="outlined"
          onChange={this.onChange}>
        </TextField>
        <TextField
          className='input'
          id="email"
          label={TRANSLATIONS.EMAIL}
          value={email} name="email"
          variant="outlined"
          onChange={this.onChange}>
        </TextField>
        <TextField
          className='input'
          id="password"
          label={TRANSLATIONS.PASSWORD}
          value={password} name="password"
          variant="outlined"
          type="password"
          onChange={this.onChange}>
        </TextField>
        <Button variant="contained" className="btn btn-primary" disabled={isInvalid} type="submit" color="primary">
          Sign Up
        </Button>
 
        {error && <p className="text-align-center">{error.message}</p>}
      </form>
    );
  }
}
 
const SignUpLink = () => (
  <p className="text-align-center">
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);


const SignUpForm = compose(
    withRouter,
    withFirebase,
  )(SignUpFormBase);
 
export default SignUpPage;
 
export { SignUpForm, SignUpLink };