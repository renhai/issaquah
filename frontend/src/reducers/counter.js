import { INCREMENT } from '../actions/counters';

const initialState = {
  count: 0,
};

export default function reducer(state = initialState, { type }) {
  switch (type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}
