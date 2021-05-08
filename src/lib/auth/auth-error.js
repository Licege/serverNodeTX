class AuthError extends Error {
  constructor(code, message) {
    super(message)
    this.name = 'AuthenticationError'
    this.code = code
  }
}

module.exports = AuthError