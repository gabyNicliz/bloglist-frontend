import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios
    .post(baseUrl, newObject, config);
  return response.data;
};

const likeBlog = async (objToUpdate) => {
  const response = await axios
    .put(`${baseUrl}/${objToUpdate.id}`, objToUpdate);
  return response.data;
};

const removeBlog = async (objIdToRemove) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios
    .delete(`${baseUrl}/${objIdToRemove}`, config);
  return response.data;
};

const getComments = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`);
  return response.data;
};

const addComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment);
  return response.data;
};

export default {
  getAll,
  create,
  setToken,
  likeBlog,
  removeBlog,
  getComments,
  addComment,
};