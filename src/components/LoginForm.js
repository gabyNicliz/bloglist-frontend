import React from 'react';
import { useDispatch } from 'react-redux';
import { userLogin } from '../reducers/loginReducer';
import { useField } from '../hooks/index';
import { useHistory } from 'react-router-dom';
import {
  TextField,
  Button,
} from '@material-ui/core';

const LoginForm = () => {
  const { reset: resetUsername, ...username } = useField('text');
  const { reset: resetPassword, ...password } = useField('text');

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = (event) => {
    event.preventDefault();
    const user = {
      username: username.value,
      password: password.value
    };

    dispatch(userLogin(user));
    resetUsername();
    resetPassword();
    history.push('/');
  };

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField label='username' { ...username } />
        </div>
        <div>
          <TextField label='password' type='password' { ...password } />
        </div>
        <Button variant='contained' color='primary' size='small' type='submit'>
          login
        </Button>
      </form>
    </div>
  );

};

export default LoginForm;