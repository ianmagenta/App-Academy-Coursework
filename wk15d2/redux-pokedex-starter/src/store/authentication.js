import { baseUrl } from "../config";

const SET_TOKEN = "pokedex/authentication/SET_TOKEN";
const TOKEN_KEY = "key";
const REMOVE_TOKEN = "remove/token";

export const setToken = (token) => {
  return { type: SET_TOKEN, token };
};

export const removeToken = () => {
  return { type: REMOVE_TOKEN };
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
    localStorage.setItem(TOKEN_KEY, token);
    dispatch(setToken(token));
  } catch (err) {
    console.log(err);
  }
};

export const loadToken = () => async (dispatch) => {
  const key = localStorage.getItem(TOKEN_KEY);
  if (key) {
    dispatch(setToken(key));
  }
};

export const logout = () => async (dispatch, getState) => {
  try {
    const {
      authentication: { token },
    } = getState();
    const response = await fetch(`${baseUrl}/session`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw response;
    }
    localStorage.removeItem(TOKEN_KEY);
    dispatch(removeToken());
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
    case REMOVE_TOKEN: {
      const newState = { ...state };
      delete newState.token;
      return newState;
    }
    default:
      return state;
  }
}
