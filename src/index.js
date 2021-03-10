import { randomBytes, scryptSync } from 'crypto'

/**
 * Hashes a string with either a random or provided salt.
 *
 * @param {string} string The first string to add.
 * @param {string?} salt The second string to add.
 * @returns {string} The hashed value.
 */
export const hash = (password, salt) => {
  const SALT = salt || randomBytes(8).toString('hex')
  const hash = scryptSync(password, SALT, 64).toString('hex')
  return salt ? hash : hash + SALT
}

/**
 * Compares a hash to a string.
 *
 * @param {string} value The value to compare
 * @param {string} hash The hash to compare
 * @param {string?} salt The salt used.
 * @returns {boolean} Whether or not they match.
 */
export const compare = (password, hash, salt) => {
  const [hashed, SALT] = !salt ? [hash.slice(0, hash.length - 16), hash.slice(hash.length - 16)] : [hash, salt]
  const value = scryptSync(password, SALT, 64).toString('hex')
  return value === hashed
}
