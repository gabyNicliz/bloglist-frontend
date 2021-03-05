import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

test('blog form tests', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 1,
  };

  const user = {
    username: 'test username',
  };

  const mockHandler = jest.fn();

  const component = render(
    <Blog
      blog={blog}
      user={user}
      likeBlogOnCLick={mockHandler}
      removeBlogOnClick={() => {}}
    />
  );

  const onlyTitleAndAuthorDiv = component.container.querySelector('.blog-title-author');
  expect(onlyTitleAndAuthorDiv).toBeVisible();

  const showAllBlogInfoButton = component.getByText('show');
  fireEvent.click(showAllBlogInfoButton);

  const allBlogInfoDiv = component.container.querySelector('.blog-show-all-info');
  expect(allBlogInfoDiv).toBeVisible();

  const likeButton = component.getByText('like');
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});