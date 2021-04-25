const AuthenticationError = require('./auth-error')
const { comparePassword } = require('./password')
const UserRepo = require('../../repositories/user')

let loginFailCount = 0;

const authLocal = async (req, email, password, done) => {
  const antibot = req.body && req.body.name
  try {
    if (antibot) {
      return setTimeout(() => done(new AuthenticationError(401, 'The password is not correct')), 30000)
    }

    const user = await UserRepo.one({ email })
    if (!user) {
      return done(new AuthenticationError(401, 'This email is not registered'))
    }

    const [passwordMatch] = await Promise.all([comparePassword(password, user.password)])
    if (!passwordMatch) {
      loginFailCount += 1
    }
    if (loginFailCount === 3) {
      console.log('Нужно отправить сообщение на email о подборе пароля')
    }
    if (!passwordMatch) {
      return done(new AuthenticationError(401, 'The password is not correct'))
    }
    if (false) {
      return done(new AuthenticationError(401, 'User blocked'))
    }
    const plainUser = user
    delete plainUser.password
    plainUser.entity = {
      id: user.id,
      forename: user.forename,
      surname: user.surname,
      type: 'User'
    }
    return done(null, plainUser)
  } catch (err) {
    return done(err)
  }
}

module.exports = authLocal