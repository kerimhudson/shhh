import { randomBytes, scryptSync } from 'crypto'

/**
 *
 * @param {string} the data you wish to encrypt
 * @param {string?} a salt to use for your data
 * @returns {string} the hashed value
 */
export const hash = (password, salt) => {
  const SALT = salt || randomBytes(8).toString('hex')
  const hash = scryptSync(password, SALT, 64).toString('hex')
  return salt ? hash : hash + SALT
}

/**
 *
 * @param {string} data you wish to compare
 * @param {string} the hashed data
 * @param {string?} salt
 * @returns {boolean} whether or not the values match
 */
export const compare = (password, hash, salt) => {
  console.log(salt)
  const [hashed, SALT] = !salt ? [hash.slice(0, hash.length - 16), hash.slice(hash.length - 16)] : [hash, salt]
  const value = scryptSync(password, SALT, 64).toString('hex')
  return value === hashed
}
