/**
 * fetch cookie
 */

export async function fetchAllCookie (): Promise<chrome.cookies.Cookie[]> {
  return new Promise(resolve => {
    chrome.cookies.getAll({}, function(cookies: chrome.cookies.Cookie[]) {
      resolve(cookies);
    });
  });
}