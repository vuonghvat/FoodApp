import axios from 'axios';
import AsyncStorageApp from '../utils/AsyncStorageApp';
import qs from "qs"
 


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
        'Content-Type': 'application/x-www-form-urlencoded',
       
        
      }

     
    var req = axios({
      method: method,
      url: url,
      data: qs.stringify(data),
      headers: headers,
      options,
    });

    req
      .then(resp => {
        callback(resp, undefined);
      })
      .catch(err => {
        callback(undefined, err);
      });
  });
};

export default request;