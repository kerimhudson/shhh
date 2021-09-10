# SHHH!

SHHH! is a small library for hashing sensitive data, such as passwords. It comes with a similar to the bcrypt npm package, but utilises scrypt which is built into the node crypto library. It comes in two variations, depending on your preferred method of utilising a library.
### Usage

**Method 1**
```js
import shhh from 'shhh'

const { hash, compare } = shhh('PEPPER') // you can add an optional pepper here if you'd want a bit more security
const user = { email: 'john@mail.com', password: "supersecretpassword" }

const hashedPassword = hash(user.password) // returns hashed password, utilising the pepper if provided
const isSamePassword = compare(user.password, hashedPassword) // returns true
```

**Method 2**
```js
import { hash, compare } from 'shhh'

const user = { email: 'john@mail.com', password: "supersecretpassword" }
const pepper = 'PEPPER'
const hashedPassword = hash(user.password, pepper) // returns hashed password, utilising the pepper if provided
const isSamePassword = compare(user.password, hashedPassword, pepper) // returns true
```

Use of the `pepper` is entirely optional. Some argue that it allows for a slightly hardened security as it includes a value that is not within the database. If you do use the `pepper`, store this value outside of the database, for example as an environment variable.
##### Notes

- I'm by no means an expert in cryptography. You can read more about what scrypt is [here](https://qvault.io/2020/07/25/very-basic-intro-to-the-scrypt-hash/)
- This project is open to contributions