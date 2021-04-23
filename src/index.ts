import { randomBytes, scryptSync } from 'crypto'

type Hash = string
type Salt = string
type HashSalt = string

export const hash = (password: string, split = true): HashSalt | [Hash, Salt] => {
  const salt =  randomBytes(8).toString('hex')
  const hash = scryptSync(password, salt, 64).toString('hex')
  if(split) {
    return [hash, salt]
  }
  return hash + salt
}


export const compare = (password: string, hash: Hash | HashSalt, salt?: Salt): boolean => {
  const [hashed, SALT] = !salt ? [hash.slice(0, hash.length - 16), hash.slice(hash.length - 16)] : [hash, salt]
  const value = scryptSync(password, SALT, 64).toString('hex')
  return value === hashed
}
