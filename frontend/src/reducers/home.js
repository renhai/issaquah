/**
 * Created by hai on 7/25/17.
 */

const initialState = {
  testers: []
};

export default function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case 'FETCH_TESTERS_SUCCESS':
      return {
        ...state,
        testers: payload.data
      };
    default:
      return state;
  }
}
