// @ts-nocheck
import { compare, hash } from '../src'
import { test } from 'tap'
import faker from 'faker'
test('hash', t => {
  t.test('hashes the value', u => {
    const STRING = faker.random.words(Math.floor(Math.random() * 10))
    const result = hash(STRING)
    u.notEqual(result, STRING, 'returns a hashed value')
    u.true(typeof result === 'string', 'returns a string')
    u.end()
  })

  t.test('hashes a value when a salt is passed in', u => {
    const STRING = faker.random.words(Math.floor(Math.random() * 10))
    const SALT = faker.random.words(2)
    const result = hash(STRING, SALT)
    u.notEqual(result, STRING, 'returns a hashed value')
    u.true(typeof result === 'string', 'returns a string')
    u.end()
  })
  t.end()
})

test('compare', t => {
  const STRING = faker.random.words(Math.floor(Math.random() * 10))
  const SALT = faker.random.words(2)
  const hashedWithoutSalt = hash(STRING)
  const hashedWithSalt = hash(STRING, SALT)

  t.test('if hashed with salt', u => {
    u.test('if correct salt is provided', x => {
      const result = compare(STRING, hashedWithSalt, SALT)
      x.true(result, 'should return true')
      x.end()
    })

    u.test('if incorrect salt is provided', x => {
      const result = compare(STRING, hashedWithSalt, 'RANDOM SALT')
      x.false(result, 'should return false')
      x.end()
    })

    u.test('if incorrect value is provided', x => {
      const result = compare('RANDOM_STRING', hashedWithSalt, SALT)
      x.false(result, 'should return false')
      x.end()
    })

    u.end()
  })

  t.test('if hashed without salt', u => {
    u.test('if correct value is provided', x => {
      const result = compare(STRING, hashedWithoutSalt)
      x.true(result, 'should return true')
      x.end()
    })

    u.test('if incorrect value is provided', x => {
      const result = compare('RANDOM_STRING', hashedWithSalt, SALT)
      x.false(result, 'should return false')
      x.end()
    })

    u.end()
  })

  t.end()
})
