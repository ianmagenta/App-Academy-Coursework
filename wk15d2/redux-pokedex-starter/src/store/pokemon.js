import { baseUrl } from "../config";

const LOAD = "pokedex/pokemon/LOAD";

export const load = (list) => {
  return { type: LOAD, list };
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD: {
      return {
        ...state,
        list: action.list,
      };
    }
    default:
      return state;
  }
}

export const getPokemon = () => async (dispatch, getState) => {
  try {
    const {
      authentication: { token },
    } = getState();
    const response = await fetch(`${baseUrl}/pokemon`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw response;
    }
    const list = await response.json();
    dispatch(load(list));
  } catch (err) {
    console.log(err);
  }
};
