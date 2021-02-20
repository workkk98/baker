/**
 * 不同于localStorage等API，必须封装为对象，且是异步操作。
 * @param {*} key 
 * @param {*} value 
 */
export function setStorageItem (key: string, value: any) {
  return new Promise((resolve, reject) => {
    chrome.storage?.sync?.set({[key]: value}, function() {
      resolve(null);
    });
  });
}

/**
 * 第一个参数是[key],对应chrome.storage.sync.set第一个参数的key。
 * TODO: 错误机制
 * @param { Array } key
 */
export function getStorageItem (key: string): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([key], function (value) {
      if (!value[key]) {
        return reject();
      }
      resolve(value[key]);
    });
  });
}