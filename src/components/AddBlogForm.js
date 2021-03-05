/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';
import { showMessage } from '../reducers/notificationReducer';
import { useField } from '../hooks/index';
import {
  TextField,
  Button,
} from '@material-ui/core';

const BlogForm = (props) => {
  const { reset: resetTitle, ...title } = useField('text');
  const { reset: resetAuthor, ...author } = useField('text');
  const { reset: resetURL, ...url } = useField('text');

  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    dispatch(createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    }));
    dispatch(showMessage(`A new blog ${title.value} by ${author.value} added`, 5));
    resetTitle();
    resetAuthor();
    resetURL();
  };

  return (
    <div>
      <h2>create new</h2>
      <br></br>
      <form onSubmit={addBlog}>
        <div>
          <TextField label='title' { ...title } />
        </div>
        <div>
          <TextField label='author' { ...author } />
        </div>
        <div>
          <TextField label='url' { ...url } />
        </div>
        <Button variant='contained' color='primary' size='small' type='submit'>
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;