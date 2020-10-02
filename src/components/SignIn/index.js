import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as TRANSLATIONS from '../../constants/translations';
import * as ROUTES from '../../constants/routes';

/** styling **/
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import './signIn.scss';

const SignInPage = () => (
  <>
    <CssBaseline />
    <Container maxWidth="sm" className="container">
      <div className='form'>
        <h1 className='margin-bottom-15 text-align-center'>{TRANSLATIONS.LOGIN}</h1>
        <SignInForm />
        <SignUpLink />
      </div>
    </Container>
  </>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};



class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };





  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    let classes = () => ({
      root: {
        margin: '0px',
        width: '200px',
      },
      input: {
        margin: '20px',
        width: '100%'
      }
    })

    return (
      <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
        <TextField
          className='input'
          id="email"
          label={TRANSLATIONS.EMAIL}
          value={email} name="email"
          variant="outlined"
          onChange={this.onChange}>
        </TextField>
        <TextField
          className='input' id="password" label={TRANSLATIONS.PASSWORD} value={password} name="password" variant="outlined" type="password" onChange={this.onChange}></TextField>
        <Button variant="contained" className="btn btn-primary" disabled={isInvalid} type="submit" color="primary">
          Sign In
        </Button>
        {error && <p className="text-align-center">{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };