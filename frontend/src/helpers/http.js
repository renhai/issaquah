/**
 * Universal(Isomorphic) Ajax Util
 * @see https://github.com/mzabriskie/axios
 */
import axios from 'axios';
import config from '../../config/index';

/**
 * DO NOT USE responseType (Android <4.4.4 does not support json as responseType)
 * @see http://caniuse.com/#feat=xhr2
 */
export default axios.create({
  baseURL: `//${config.host}:${config.port}/api`,
  transformResponse: [...axios.defaults.transformResponse, (data) => {
    // fix responseType issue
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],
  timeout: 8000,
});
