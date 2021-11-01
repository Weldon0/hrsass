import Cookies from 'js-cookie'

const TokenKey = 'hrsass-heima'
const TimeKey = 'hrsaas-timestamp-key'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 设置时间戳
export function setTimeStamp() {
  return Cookies.set(TimeKey, Date.now())
}

// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(TimeKey)
}
