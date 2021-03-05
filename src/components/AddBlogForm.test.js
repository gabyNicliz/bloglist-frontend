import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import AddBlogForm from './AddBlogForm';

test('<AddBlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn();

  const component = render(<AddBlogForm createBlog={createBlog} />);

  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');

  const form = component.container.querySelector('form');

  fireEvent.change(title, { target: { value: 'test title' } });
  fireEvent.change(author, { target: { value: 'test author' } });
  fireEvent.change(url, { target: { value: 'test url' } });

  fireEvent.submit(form);

  expect(createBlog.mock.calls.length).toBe(1);
  expect(createBlog.mock.calls[0][0].title).toBe('test title');
  expect(createBlog.mock.calls[0][0].author).toBe('test author');
  expect(createBlog.mock.calls[0][0].url).toBe('test url');
});