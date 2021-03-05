import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Toolbar,
  AppBar
} from '@material-ui/core';

const NavigationBar = ({ user, handleLogout }) => {

  return (
    <AppBar position='static'>
      <Toolbar>
        <Button color='inherit' component={Link} to='/'>
          blogs
        </Button>
        <Button color='inherit' component={Link} to='/users'>
          users
        </Button>
        {user
          ? <p>{user.username} logged in <Button onClick={handleLogout}>
            logout
          </Button></p>
          : <Button color='white' component={Link} to='/login'>
            login
          </Button>
        }
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;