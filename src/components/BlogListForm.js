/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core';

const BlogListForm = ({ blogs }) => {
  return (
    <div>
      <List component='nav'>
        {blogs.map((blog) =>
          <ListItem button key={blog.id} component={Link} to={`/blogs/${blog.id}`} >
            <ListItemText primary={`${blog.title}`} />
          </ListItem>
        )}
      </List>
    </div>
  );
};

export default BlogListForm;