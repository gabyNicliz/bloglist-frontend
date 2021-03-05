import React from 'react';
import './Blog.css';
import Comment from './Comment';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { likeBlog, removeBlog, addComment } from '../reducers/blogsReducer';
import { showMessage } from '../reducers/notificationReducer';
import { useField } from '../hooks/index';
import { TextField, Button, IconButton } from '@material-ui/core';
import { ThumbUp } from '@material-ui/icons';

const Blog = ({ blogs }) => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = blogs.find((b) => b.id ===id);
  const { reset: resetContent, ...content } = useField('text');
  const history = useHistory();

  if (!blog) return null;

  const blogUrl = (/(http:\/\/){7}/).test(blog.url) ? blog.url : `https://${blog.url}`;

  const handleLike = (event) => {
    event.preventDefault();
    dispatch(likeBlog(blog));
    dispatch(showMessage(`Liked ${blog.title} by ${blog.author}`, 5));
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    dispatch(addComment(blog.id, content.value));
    dispatch(showMessage(`comment ${content.value} added`, 5));
    resetContent();
  };

  const handleRemove = (event) => {
    event.preventDefault();
    dispatch(removeBlog(blog.id));
    dispatch(showMessage(`Removed ${blog.title} by ${blog.author}`, 5));
    history.push('/');
  };

  return (
    <div data-cy='blog-div'>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={`${blogUrl}`}>{blogUrl}</a>
      <p>likes: {blog.likes}
        <IconButton color='primary' size='small' onClick={handleLike}>
          <ThumbUp />
        </IconButton></p>
      <p>{blog.user.username}</p>
      <Button variant='contained' color='primary' size='small' onClick={handleRemove}>
        remove blog
      </Button>
      <br></br>
      <h3>comments</h3>
      <br></br>
      <form onSubmit={handleAddComment}>
        <div>
          <TextField { ...content } />
        </div>
        <Button variant='contained' color='primary' size='small' type='submit'>
          add comment
        </Button>
      </form>
      <ul>
        {blog.comments.map((comment) =>
          <Comment key={comment.id} comment={comment} />
        )}
      </ul>
    </div>
  );
};

export default Blog;
