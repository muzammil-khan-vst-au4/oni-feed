import { GET_SEARCH } from "../constants";

const initialState = {
  results: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SEARCH:
      return {
        ...state,
        results: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
