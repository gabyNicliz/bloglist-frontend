import React from 'react';

const Comment = ({ comment }) => {
  const liStyle = {
    margin: 10
  };
  return (
    <li style={liStyle}>{comment.content}</li>
  );
};

export default Comment;