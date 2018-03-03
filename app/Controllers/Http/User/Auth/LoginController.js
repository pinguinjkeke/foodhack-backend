'use strict'

const User = use('App/Models/User')

class LoginController {
  async login ({ request, auth }) {
    const { phone, password } = request.all()

    const { token } = await auth.authenticator('jwtUser').attempt(phone, password)

    return {
      data: await User.findBy('phone', phone),
      token
    }
  }
}

module.exports = LoginController
