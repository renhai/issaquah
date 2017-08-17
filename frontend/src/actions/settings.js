/**
 * Created by hai on 8/17/17.
 */

export function checkDisplayField(checkboxName, checked) {
  return (dispatch, getState) =>
    dispatch({type: 'CHECK_DISPLAY_FIELD', payload: {checkboxName, checked}});
}

export function selectAllFields() {
  return (dispatch, getState) =>
    dispatch({type: 'SELECT_ALL_FIELDS'});
}

export function deselectAllFields() {
  return (dispatch, getState) =>
    dispatch({type: 'DESELECT_ALL_FIELDS'});
}

