import axios from 'axios';
class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl;
    this.queue = {};
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {}
    };
    return config;
  }
  destroy (url) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {}
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
        
        // 这个请求头是自己添加的，源文件没有这个
        // 获取可能有的token值进行请求头设置 Authorization：token
        var token = localStorage.getItem('itcast_pro_token')
  config.headers['Authorization'] = token
      }
      this.queue[url] = true;
      return config;
    }, error => {
      return Promise.reject(error);
    });
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url);
      const { data, status } = res;
      return { data, status };
    }, error => {
      this.destroy(url);
      let errorInfo = error.response;
      if (!errorInfo) {
        const { request: { statusText, status },
          config
        } = JSON.parse(JSON.stringify(error));
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        };
      }
    //   addErrorLog(errorInfo);
      return Promise.reject(error);
    });
  }
  request (options) {
    axios.defaults.transformRequest = [
      function (data, config) {
        if (!config['Content-Type']) {
          let ret = '';
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
          }
          return ret;
        }
        switch (config['Content-Type'].toLowerCase()) {
          case 'application/json': {
            return JSON.stringify(data);
          }
          case 'multipart/form-data': {
            return data;
          }
          default: {
            let ret = '';
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            return ret;
          }
        }
      }
    ];
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
}
export default HttpRequest;




// 这里可以两个文件也可以三个文件
baseUrl: {
  dev: {
    policeSituation:'http://127.0.0.1:3000'
  }
  pro: {
   
  }
}
import HttpRequest from './axios';
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro;
export const policeSituation = new HttpRequest(baseUrl.policeSituation); 


