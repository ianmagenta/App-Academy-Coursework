import { baseUrl } from "../config";

const SET_TOKEN = "pokedex/authentication/SET_TOKEN";

export const setToken = (token) => {
  return { type: SET_TOKEN, token };
};

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await fetch(`${baseUrl}/session`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw response;
    }
    const { token } = await response.json();
    dispatch(setToken(token));
  } catch (err) {
    console.log(err);
  }
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }

    default:
      return state;
  }
}
