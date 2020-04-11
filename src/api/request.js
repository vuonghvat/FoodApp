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
    post: (url, data, options) =>
      reqf(methods.POST, url, data, options, callback),
    put: (url, data, options = {}) =>
      reqf(methods.PUT, url, data, (options = {}), callback),
    delete: (url, data, options = {}) =>
      reqf(methods.DELETE, url, data, (options = {}), callback),
  };
};

const reqf = (method, url, data, options, callback) => {
  AsyncStorageApp._retrieveData('user_login', res => {
    const token = res?res.access_token : undefined;
   
    let ContentType = options?options.ContentType ||  'application/x-www-form-urlencoded' :  'application/x-www-form-urlencoded'
    const headers =  {
        Authorization: 'Bearer ' + (token ? token : ''),
        'Content-Type': ContentType,
      }

      // console.log({
      //   method: method,
      //   url: url,
      //   data: qs.stringify(data),
      //   headers: headers,
      //   options,
      // });
    var req = axios({
      method: method,
      url: url,
      data:  ContentType === 'application/x-www-form-urlencoded'?qs.stringify(data):data,
      headers: headers,
      options,
    });
    console.log({
      method: method,
      url: url,
      data:  ContentType === 'application/x-www-form-urlencoded'?qs.stringify(data):data,
      headers: headers,
      options,
    });
    

    req
      .then(resp => {
        console.log(resp,"resssssssss");
        
        const data = resp.data;
       
        if(data.err && data.err =="timeout"){
          alert("Phiên hết hạn, vui lòng đăng nhập lại")
        }
        callback(resp, undefined);
      })
      .catch(err => {
        console.log(err,"errrr");
        callback(undefined, err);
      });
  });
};

export default request;