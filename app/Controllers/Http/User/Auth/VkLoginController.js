'use strict'

const User = use('App/Models/User')

class VkLoginController {

  async login ({ request, auth }) {

    const user = await User.findBy('email', request.input('email'))

    const { token } = await auth.authenticator('jwtUser').generate(user)

    return {
      data: user,
      token
    }
  }
}

module.exports = VkLoginController
