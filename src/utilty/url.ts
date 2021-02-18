export function createUrlFromCookie (cookie: chrome.cookies.Cookie) {
  return 'http' + (cookie.secure ? 's' : '') + '://' + cookie.domain + cookie.path;
}