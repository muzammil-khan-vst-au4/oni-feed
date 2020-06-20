import axios from "axios";
import { ADD_POST, GET_POSTS, LOADING_POSTS, GET_SEARCH } from "../constants";

export const addPost = (postData) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/posts/add", postData)
    .then((res) =>
      dispatch({
        type: ADD_POST,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

export const getPosts = () => (dispatch) => {
  dispatch(loadPosts);
  axios
    .get("http://localhost:5000/api/posts")
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

export const searchPosts = (query, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/posts/search", query)
    .then((res) => {
      console.log("response in actions", res);
      history.push(`/search`);
      dispatch({
        type: GET_SEARCH,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const loadPosts = () => {
  return {
    type: LOADING_POSTS,
  };
};
