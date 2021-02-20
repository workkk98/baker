/**
 * @file cookie的API
 */

export function setCookie (domain: string, name: string, value: string) {
  return new Promise((resolve, reject) => {
    chrome.cookies.set({
      url: domain,
      name: name,
      value: value
    }, (cookie) => {
      console.log('cookie-set', cookie);
      if (!cookie) reject(null);
      resolve(cookie);
    });
  });
}