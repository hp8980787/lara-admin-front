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
  return true;
}
// /**
//  * @param {string} value
//  * @returns {Boolean}
//  */
// export function validRequired(value) {
//   return value.length > 0 ? true : false
// }
/**
 * 
 * @param {String} time
 * @returns {Boolean} 
 */
export function validDeadline(time) {
  const now = new Date()
 
  return time>now
}