

///////////////////////////////////
////////   db functions       ////
/////////////////////////////////

import uuid from 'uuid/v1';
// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const url = 'http://localhost:5001';
const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () => {
    return fetch(`${url}/categories`, { headers })
      .then(res => res.json());
  };

export const getdbPost = (postId) => {
    return fetch(`${url}/posts/${postId}`, { headers })
      .then(res => res.json());
  }

export const getdbPosts = () => {
    return fetch(`${url}/posts`, { headers })
      .then(res => res.json());
  };

export const deletedbPost = (postId) => {
    return fetch(`${url}/posts/${postId}`, { method: 'DELETE', headers });
  };

export const getdbComments = (postId) => {
    return fetch(`${url}/posts/${postId}/comments`, { headers })
      .then(res => res.json());
  };

export const createNewdbPost = (postData) => {
    const post = {
      id: uuid(),
      timestamp: Date.now(),
      title: postData.title,
      body: postData.body,
      author: postData.author,
      category: postData.category
    };
    const options = {
      method: 'POST',
      headers: { ...headers, 'content-type': 'application/json' },
      body: JSON.stringify(post)
    };
    return fetch(`${url}/posts`, options)
      .then(res => res.json());
  };

export const editdbPost = (postData) => {
    const { id, title, body } = postData;
    const options = {
      method: 'PUT',
      headers: { ...headers, 'content-type': 'application/json' },
      body: JSON.stringify({ title, body })
    };
    return fetch(`${url}/posts/${id}`, options)
      .then(res => res.json());
  };

  const voteComment = (commentId, option) => {
    const options = {
      method: 'POST',
      headers: { ...headers, 'content-type': 'application/json' },
      body: JSON.stringify({ option })
    };
    return fetch(`${url}/comments/${commentId}`, options)
      .then(res => res.json());
  };

export const upVotedbComment = (commentId) => {
    return voteComment(commentId, 'upVote');
  };

export const downVotedbComment = (commentId) => {
    return voteComment(commentId, 'downVote');
  };

  const votePost = (postId, option) => {
    const options = {
      method: 'POST',
      headers: { ...headers, 'content-type': 'application/json' },
      body: JSON.stringify({ option })
    };
    return fetch(`${url}/posts/${postId}`, options)
      .then(res => res.json());
  };

export const upVotedbPost = (commentId) => {
    return votePost(commentId, 'upVote');
  };

export const downVotedbPost = (commentId) => {
    return votePost(commentId, 'downVote');
  };

export const createNewdbComment = (commentData) => {
    const comment = {
      id: uuid(),
      timestamp: Date.now(),
      body: commentData.body,
      author: commentData.author,
      parentId: commentData.parentId
    };
    const options = {
      method: 'POST',
      headers: { ...headers, 'content-type': 'application/json' },
      body: JSON.stringify(comment)
    };
    return fetch(`${url}/comments`, options)
      .then(res => res.json());
  };

export const editdbComment = (commentData) => {
    const { id, body } = commentData;
    const options = {
      method: 'PUT',
      headers: { ...headers, 'content-type': 'application/json' },
      body: JSON.stringify({ body })
    };
    return fetch(`${url}/comments/${id}`, options)
      .then(res => res.json());
  };

export const deletedbComment = (commentId) => {
    return fetch(`${url}/comments/${commentId}`, { method: 'DELETE', headers });
  };
