/**
 * Created by hai on 7/25/17.
 */

const initialState = {
  testers: [],
  sortName: undefined,
  sortOrder: undefined,
  filterObj: {}
};

export default function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case 'FETCH_TESTERS_SUCCESS':
      return {
        ...state,
        testers: payload.data.testers,
        sortName: payload.data.sortName,
        sortOrder: payload.data.sortOrder
      };
    case 'EDIT_CELL_SUCCESS': {
      const testers = state.testers;
      const newTesters = [];
      for (const value of testers) {
        if (value.id === payload.data.id) {
          newTesters.push(payload.data);
        } else {
          newTesters.push(value);
        }
      }
      return {
        ...state,
        testers: newTesters
      };
    }
    case 'SORT_CHANGE_SUCCESS':
      return {
        ...state,
        testers: payload.data.testers,
        sortName: payload.data.sortName,
        sortOrder: payload.data.sortOrder
      };
    case 'FILTER_CHANGE_SUCCESS':
      return {
        ...state,
        testers: payload.data.testers,
        filterObj: JSON.parse(payload.data.filterObj)
      };

    default:
      return state;
  }
}
