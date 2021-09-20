import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

/**
 * Takes a user's password and hashes it for storage in a database.
 * @param {string} password
 * @param {string?} pepper Used if you want to pepper the password before hashing
 * @returns {string}
 */
const hash = (password, pepper) => {
  const salt = randomBytes(8).toString("hex");
  const hash = scryptSync(password + pepper, salt, 64).toString("hex");
  return hash + salt;
};
/**
 * Compare the user's inputted password with the hashed password stored, likely in a database. Returns a boolean result depending on whether or not they match.
 * @param {string} password
 * @param {string} hash
 * @param {string?} pepper If using pepper when hashing, add it here also
 * @returns {boolean}
 */
const compare = (password, hash, pepper) => {
  const salt = hash.slice(hash.length - 16);
  const hashBuffer = Buffer.from(hash.slice(0, hash.length - 16), "hex");
  const value = scryptSync(password + pepper, salt, 64);

  return timingSafeEqual(hashBuffer, value);
};

/**
 *
 * @param {string?} pepper Add a pepper to your hashing functions!
 * @returns {{
 * hash: (password: string) => string,
 * compare: (password: string, hash: string) => boolean
 * }} An object of functions with hash and compare, allowing you to hash and compare passwords.
 */
const shhh = (pepper) => ({
  hash: (password) => hash(password + pepper),
  compare: (password, hash) => compare(password + pepper, hash),
});

export { shhh, hash, compare };
