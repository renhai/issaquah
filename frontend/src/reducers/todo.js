import { UPDATE_TODOS } from '../actions/todos';

const initialState = {
  todos: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_TODOS:
      return { ...state, todos: payload.todos };
    default:
      return state;
  }
}
