/**
 * Created by hai on 7/25/17.
 */

const axios = require('axios');

export function loadTesters() {
  return (dispatch, getState) =>
    dispatch({type: 'FETCH_TESTERS', payload: axios.get('/api/testers')});
}
