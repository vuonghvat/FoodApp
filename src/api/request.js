import axios from 'axios';
import AsyncStorageApp from '../utils/AsyncStorageApp';

const methods = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
};
axios.defaults.withCredentials = true;

const request = callback => {

  return {
    get: (url, data, options = {}) =>
      reqf(methods.GET, url, data, (options = {}), callback),
    post: (url, data, options = {}) =>
      reqf(methods.POST, url, data, (options = {}), callback),
    put: (url, data, options = {}) =>
      reqf(methods.PUT, url, data, (options = {}), callback),
    delete: (url, data, options = {}) =>
      reqf(methods.DELETE, url, data, (options = {}), callback),
  };
};

const reqf = (method, url, data, options = {}, callback) => {
  AsyncStorageApp._retrieveData('user_login', res => {
    const token = res?res.access_token : undefined;
    const headers =  {
        Authorization: 'bearer ' + (token ? token : ''),
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }


    var req = axios({
      method: method,
      url: url,
      data,
      headers: headers,
      options,
    });

    req
      .then(res => {
        callback(res, undefined);
      })
      .catch(err => {
        callback(undefined, err);
      });
  });
};

export default request;