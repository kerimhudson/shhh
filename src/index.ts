import { randomBytes, scryptSync } from 'crypto'


export const hash = (password: string, salt?: string): string => {
  const SALT = salt || randomBytes(8).toString('hex')
  const hash = scryptSync(password, SALT, 64).toString('hex')
  return salt ? hash : hash + SALT
}


export const compare = (password: string, hash: string, salt?: string): boolean => {
  const [hashed, SALT] = !salt ? [hash.slice(0, hash.length - 16), hash.slice(hash.length - 16)] : [hash, salt]
  const value = scryptSync(password, SALT, 64).toString('hex')
  return value === hashed
}
