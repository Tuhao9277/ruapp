import Taro from '@tarojs/taro';
import { HTTP_STATUS } from '../const/status';
import { logError } from '../utils';
import configuration from './env';

export default {
  baseOptions(params, method = 'GET') {
    const { url, data } = params;
    // let token = getApp().globalData.token
    // if (!token) login()
    const option = {
      isShowLoading: true,
      loadingText: '正在加载',
      url: configuration.API_SVC + url,
      data,
      method,
      header: params.contentType ? { 'content-type': params.contentType || '' } : {},
      success(res) {
        if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
          return logError('api', '请求资源不存在');
        } else if (res.statusCode === HTTP_STATUS.SERVER_ERROR) {
          Taro.showToast({
            title: res.data.message,
            icon: 'none',
          });
          return logError('api', '服务端出现了问题');
        } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
          return logError('api', '没有权限访问');
        } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
          return res.data;
        }
      },
      error(e) {
        logError('api', '请求接口出现问题', e);
      },
    };
    return Taro.request(option);
  },
  get: function(url, data = {}) {
    const option = { url, data};
    return this.baseOptions(option);
  },
  post: function(url, data = {}, contentType = 'application/x-www-form-urlencoded') {
    const params = { url, data, contentType };
    return this.baseOptions(params, 'POST');
  },
};
