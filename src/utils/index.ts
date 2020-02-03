import { getCurrentPages } from '@tarojs/taro';
import moment from 'moment';

export const promisify = (func, ctx) => {
  // 返回一个新的function
  return function() {
    // 初始化this作用域
    ctx = ctx || this;
    // 新方法返回的promise
    return new Promise((resolve, reject) => {
      // 调用原来的非promise方法func，绑定作用域，传参，以及callback（callback为func的最后一个参数）
      func.call(ctx, ...arguments, function() {
        // 将回调函数中的的第一个参数error单独取出
        let args = Array.prototype.map.call(arguments, item => item);
        const err = args.shift();
        // 判断是否有error
        if (err) {
          reject(err);
        } else {
          // 没有error则将后续参数resolve出来
          args = args.length > 1 ? args : args[0];
          resolve(args);
        }
      });
    });
  };
};

export const promiseImage = url => {
  return new Promise(function(resolve, reject) {
    resolve(url);
  });
};
export const isChinese = str => {
  if (escape(str).indexOf('%u') < 0) return false;
  return true;
};
export const emoj2str = str => {
  return unescape(escape(str).replace(/\%uD.{3}/g, ''));
};
/*获取当前页url*/
export const getCurrentPageUrl = () => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const url = currentPage.route;
  return url;
};
export const handleName = str => {
  let res = emoj2str(str);
  if (isChinese(res)) {
    res = res.length > 4 ? res.slice(0, 4) + '...' : res;
  } else {
    res = res.length > 7 ? res.slice(0, 7) + '...' : res;
  }
  return res;
};

export const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

export const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  );
};

export const logError = (name, action, info = 'empty') => {
  let device;
  try {
    const deviceInfo = wx.getSystemInfoSync();
    device = JSON.stringify(deviceInfo);
  } catch (err) {
    console.error('not support getSystemInfoSync api', err.message);
  }
  const time = formatTime(new Date());
  console.error(time, name, action, info, device);
  // if (typeof action !== 'object') {
  // fundebug.notify(name, action, info)
  // }
  // fundebug.notifyError(info, { name, action, device, time })
  if (typeof info === 'object') {
    info = JSON.stringify(info);
  }
};
export const lsSave = (key: string, value: any) => {
  if (typeof value === 'string') {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
export function lsReadStr(key: string) {
  return localStorage.getItem(key) || '';
}

export function lsRemove(key: string) {
  return localStorage.removeItem(key);
}

export function lsReadObj(key: string) {
  const t = localStorage.getItem(key);
  if (t) {
    try {
      const result = JSON.parse(t);
      return result;
    } catch (e) {
      lsRemove(key);
      return undefined;
    }
  } else {
    return undefined;
  }
}

export function lsReadArr(key: string) {
  const t = localStorage.getItem(key);
  if (t) {
    try {
      const result = JSON.parse(t);
      if (result instanceof Array) {
        return result;
      } else {
        lsRemove(key);
        return undefined;
      }
    } catch (e) {
      lsRemove(key);
      return undefined;
    }
  } else {
    return undefined;
  }
}
export function formattedTime(time: number) {
  return moment(time).format('YYYY-MM-DD HH:mm:ss');
}
export function formatterTime(time: number) {
  return moment(time).format('HH:mm:ss');
}
