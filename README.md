# SHHH!

shhh is a small library for one-way hashing sensitive data. Similar to `bcrypt`, but utilises `scrypt` in node's crypto library.

### Usage


```js

import { hash, compare } from '@kerimhudson/shhh'

// hash the value
const hashedValue = hash('SUPER_SECRET_PASSWORD')

// provide your own salt if you'd prefer
const hashedWithASalt = hash('SUPER_SECRET_PASSWORD', 'CUSTOM_SALT')

// compare a string with the hashed value
const compare('SUPER_SECRET_PASSWORD', hashedValue) // returns true

// compare when using your own salt
const compareWithASalt = compare('SUPER_SECRET_PASSWORD', hashedWithASalt, 'CUSTOM_SALT') // returns true

```

##### Notes

I'm by no means an expert in cryptography. This was just a small experiment to try and make something with the same API as bcrypt. You can read more about what scrypt is [here](https://qvault.io/2020/07/25/very-basic-intro-to-the-scrypt-hash/)