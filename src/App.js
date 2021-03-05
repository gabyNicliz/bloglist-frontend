import React, { useEffect } from 'react';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import blogService from './services/blogs';
import Notification from './components/Notification';
import BlogListForm from './components/BlogListForm';
import Blog from './components/Blog';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import AddBlogForm from './components/AddBlogForm';
import UsersList from './components/UsersList';
import User from './components/User';
import NavigationBar from './components/NavigationBar';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogsReducer';
import { initializeUsers } from './reducers/usersReducer';
import { userLogout } from './reducers/loginReducer';

const App = () => {
  const user = useSelector(state => state.login);
  const users = useSelector(state => state.users);
  const blogs = useSelector(state => state.blogs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'));
    if (loggedUser) {
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const handleLogout = () => {
    dispatch(userLogout());
    window.localStorage.clear();
  };

  const blogForm = () => (
    <Togglable buttonLabel={'new blog'}>
      <AddBlogForm />
    </Togglable>
  );

  return (
    <Container>
      <div className='App'>
        <Notification />
        <Router>
          <NavigationBar
            user={user}
            handleLogout={handleLogout}
          />
          <h2>Blog App</h2>
          <Switch>
            <Route path='/blogs/:id'>
              <Blog blogs={blogs} />
            </Route>
            <Route path='/users/:id'>
              <User users={users} />
            </Route>
            <Route path='/users'>
              <UsersList users={users} />
            </Route>
            <Route path='/login'>
              {user
                ? <Redirect to='/' />
                : <LoginForm />
              }
            </Route>
            <Route path='/create-blog'>
              {blogForm()}
            </Route>
            <Route path='/'>
              {user
                ?
                <div>
                  {blogForm()}
                  <BlogListForm blogs={blogs} />
                </div>
                : <Redirect to='/' />
              }
            </Route>
          </Switch>
        </Router>
      </div>
    </Container>
  );
};

export default App;