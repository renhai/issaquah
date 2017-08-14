/**
 * Created by hai on 7/25/17.
 */
import { NotificationManager } from 'react-notifications';

const axios = require('axios');

export function loadTesters() {
  return (dispatch, getState) =>
    dispatch({type: 'FETCH_TESTERS', payload: axios.get('/api/testers')});
}

export function editCell(row, fieldName, value) {
  // return (dispatch, getState) =>
  //   dispatch({type: 'EDIT_CELL',
  //     payload: axios.put(`/api/testers/${row.id}`, {
  //       fieldName,
  //       value
  //     })
  //   });
  return (dispatch, getState) => {
    dispatch({ type: 'EDIT_CELL_LOADING' });
    axios.put(`/api/testers/${row.id}`, {
      fieldName,
      value
    }).then((response) => {
      dispatch({ type: 'EDIT_CELL_SUCCESS', payload: response });
    }).catch((error) => {
      dispatch({ type: 'EDIT_CELL_ERROR', payload: error });
      NotificationManager.error('Warning message', error.response.data.error, 3000);
    });
  };
}

export function sortChange(sortName, sortOrder) {
  return (dispatch, getState) =>
    dispatch({type: 'SORT_CHANGE', payload: axios.get(`/api/testers?sortName=${sortName}&sortOrder=${sortOrder}`)});
}

