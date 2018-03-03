'use strict'

class LoginController {
  async login ({ request, auth }) {
    const { email, password } = request.all()
    const token = await auth.authenticator('jwtCompany').attempt(email, password)

    return token
  }
}

module.exports = LoginController
