/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function getRequiredRules(name) {
  return {
    trigger: 'blur',
    message: `${name}不能为空`,
    required: true
  }
}

export function getMinMaxRules(min, max, name) {
  return {
    min,
    max,
    message: `${name}的长度为${min}-${max}位`,
    trigger: 'blur'
  }
}
