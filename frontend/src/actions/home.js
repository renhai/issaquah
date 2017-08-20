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
      NotificationManager.error('Warning message', error.response.data.message, 5000);
    });
  };
}

export function sortChange(sortName, sortOrder) {
  return (dispatch, getState) => {
    const filterObj = getState().home.filterObj;
    dispatch({
      type: 'SORT_CHANGE',
      payload: axios.get(`/api/testers?sortName=${sortName}&sortOrder=${sortOrder}&filterObj=${JSON.stringify(filterObj)}`)
    });
  };
}

export function uploadExcel(excel) {
  return (dispatch, getState) => {
    dispatch({type: 'UPLOAD_EXCEL_LOADING'});
    const data = new FormData();
    data.append('file', excel);
    axios.post('/api/excel/upload', data)
      .then((response) => {
        dispatch({type: 'UPLOAD_EXCEL_SUCCESS', payload: response});
        window.location.reload();
      }).catch((error) => {
        dispatch({type: 'UPLOAD_EXCEL_ERROR', payload: error});
        NotificationManager.error('Warning message', error.response.data.message, 5000);
      });
  };
}

export function deleteRows(rows) {
  return (dispatch, getState) => {
    const sortName = getState().home.sortName;
    const sortOrder = getState().home.sortOrder;
    const filterObj = getState().home.filterObj;
    axios.delete(`/api/testers/${rows.join()}`)
      .then((response) => {
        dispatch({type: 'FETCH_TESTERS', payload: axios.get(`/api/testers?sortName=${sortName}&sortOrder=${sortOrder}&filterObj=${JSON.stringify(filterObj)}`)});
      }).catch((error) => {
        NotificationManager.error('Warning message', error.response.data.message, 5000);
      });
  };
}

export function addRow(row) {
  return (dispatch, getState) => {
    axios.post('/api/testers', row)
      .then((response) => {
        // dispatch({type: 'FETCH_TESTERS', payload: axios.get('/api/testers')});
        window.location.reload();
      }).catch((error) => {
        NotificationManager.error('Warning message', error.response.data.message, 5000);
      });
  };
}

export function downloadExcel(store) {
  return (dispatch, getState) => {
    const params = [];
    for (const value of getState().settings.displayFields) {
      if (value.show) {
        params.push(value.field);
      }
    }
    const queryString = params.join();
    let data = store.data;
    if (store.isOnFilter) {
      data = store.filteredData;
    }
    axios.post(`/api/excel?fields=${queryString}`, data)
      .then((resp) => {
        // window.open(`/api/download?path=${resp.data}`);
        window.location.href = `/api/excel/download?path=${resp.data}`;
      })
      .catch((error) => {
        NotificationManager.error('Warning message', error.response.data.message, 5000);
      });
  };
}

export function filterChange(filterObj) {
  return (dispatch, getState) => {
    const sortName = getState().home.sortName;
    const sortOrder = getState().home.sortOrder;
    dispatch({
      type: 'FILTER_CHANGE',
      payload: axios.get(`/api/testers?sortName=${sortName}&sortOrder=${sortOrder}&filterObj=${JSON.stringify(filterObj)}`)
    });
  };
}
