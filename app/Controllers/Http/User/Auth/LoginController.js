'use strict'

class LoginController {
  async login ({ request, auth }) {
    const { phone, password } = request.all()

    const token = await auth.authenticator('jwtUser').attempt(phone, password)

    return token
  }
}

module.exports = LoginController
