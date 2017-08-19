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
  return (dispatch, getState) => {
    dispatch({ type: 'EDIT_CELL_LOADING' });
    axios.put(`/api/testers/${row.id}`, {
      fieldName,
      value
    }).then((response) => {
      dispatch({ type: 'EDIT_CELL_SUCCESS', payload: response });
    }).catch((error) => {
      dispatch({ type: 'EDIT_CELL_ERROR', payload: error });
      NotificationManager.error('Warning message', error.response.data.message, 3000);
    });
  };
}

export function sortChange(sortName, sortOrder) {
  return (dispatch, getState) =>
    dispatch({type: 'SORT_CHANGE', payload: axios.get(`/api/testers?sortName=${sortName}&sortOrder=${sortOrder}`)});
}

export function uploadExcel(excel) {
  return (dispatch, getState) => {
    dispatch({type: 'UPLOAD_EXCEL_LOADING'});
    const data = new FormData();
    data.append('file', excel);
    axios.post('/api/upload', data)
      .then((response) => {
        dispatch({type: 'UPLOAD_EXCEL_SUCCESS', payload: response});
        window.location.reload();
      }).catch((error) => {
        dispatch({type: 'UPLOAD_EXCEL_ERROR', payload: error});
        NotificationManager.error('Warning message', error.response.data.message, 3000);
      });
  };
}

export function deleteRows(rows) {
  return (dispatch, getState) => {
    axios.delete(`/api/testers/${rows.join()}`)
      .then((response) => {
        dispatch({type: 'FETCH_TESTERS', payload: axios.get('/api/testers')});
      }).catch((error) => {
        NotificationManager.error('Warning message', error.response.data.message, 3000);
      });
  };
}

export function addRow(row) {
  return (dispatch, getState) => {
    axios.post('/api/testers', row)
      .then((response) => {
        dispatch({type: 'FETCH_TESTERS', payload: axios.get('/api/testers')});
      }).catch((error) => {
        NotificationManager.error('Warning message', error.response.data.message, 3000);
      });
  };
}

