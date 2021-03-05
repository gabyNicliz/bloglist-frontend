/* eslint-disable no-case-declarations */
import blogsService from '../services/blogs';

const sortBlogs = (blogs) => blogs.sort((a, b) => b.likes - a.likes);

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [ ...state, action.data ];
    case 'LIKE':
      const id = action.data.id;
      const blogToLike = state.find((b) => b.id === id);
      const likedBlog = {
        ...blogToLike,
        likes: ++blogToLike.likes,
      };

      return sortBlogs(state
        .map((blog) => blog.id === id ? likedBlog : blog));
    case 'REMOVE_BLOG':
      return state.filter((b) => b.id !== action.data.id);
    case 'ADD_COMMENT':
      const blogId = action.data.blog;
      const blog = state.find((b) => b.id === blogId);

      const commentedBlog = {
        ...blog,
        comments: [ ...blog.comments, action.data ],
      };

      return state
        .map((blog) => blog.id === blogId ? commentedBlog : blog);
    case 'INIT_BLOGS':
      return action.data;
    default:
      return state;
  }
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogsService.create(blog);
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const blogToLike = {
      ...blog,
      likes: blog.likes + 1,
    };
    const likedBlog = await blogsService.likeBlog(blogToLike);
    dispatch({
      type: 'LIKE',
      data: { id: likedBlog.id },
    });
  };
};

export const addComment = (id, content) => {
  return async (dispatch) => {
    const newComment = {
      content,
      blog: id,
    };

    const addedComment = await blogsService.addComment(id, newComment);

    dispatch({
      type: 'ADD_COMMENT',
      data: addedComment,
    });
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogsService.removeBlog(id);
    dispatch({
      type: 'REMOVE_BLOG',
      data: { id },
    });
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  };
};

export default blogsReducer;