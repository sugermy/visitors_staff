import axios from 'axios';
import { Promise } from 'q';
import { Toast } from 'vant';
export default class Ajax {
  /**
   * @param { String } baseURL        基础请求地址
   * @param { Number } timeout        超时时间
   */
  constructor(baseURL = '', timeout = 60000) {
    // 创建一个新的axios实例，并设置默认请求地址和请求头
    this._axios = axios.create({
      baseURL,
      timeout,
      headers: {}
    });
    this._axios.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        Toast('请求连接失败');
        return Promise.reject(error);
      }
    );
    this._axios.interceptors.response.use(
      response => {
        if (response.status == 200) {
          if (response.data) {
            return response.data;
          } else {
            Toast('响应数据状态错误');
            return response;
          }
        }
      },
      error => {
        Toast('响应接口失败');
        return Promise.reject(error);
      }
    );
  }
  // 请求方式优化
  get (url, params = {}) {
    return this._axios({ method: 'get', url, params });
  }
  post (url, params = {}, data = {}) {
    return this._axios({ method: 'post', url, params, data });
  }
}
