const bcrypt = require('bcryptjs')

const hashPassword = password =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (saltError, salt) => {
      if (saltError) reject(saltError)
      bcrypt.hash(password, salt, null, (hashError, hash) => (hashError ? reject(hashError) : resolve(hash)))
    })
  })

const comparePassword = (candidatePassword, password) =>
  new Promise((resolve, reject) => {
    if (!password) {
      resolve(false)
    }
    bcrypt.compare(candidatePassword, password, (error, isMatch) => (error ? reject(error) : resolve(isMatch)))
  })

module.exports = {
  hashPassword,
  comparePassword
}