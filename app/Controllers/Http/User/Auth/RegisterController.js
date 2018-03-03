'use strict'

const { formatPhone } = require('../../../../../helpers')

const User = use('App/Models/User')
const Hash = use('Hash')

class RegisterController {
  async register ({ request, response, auth }) {
    const user = new User()
    user.email = request.input('email')
    user.phone = formatPhone(request.input('phone'))
    user.password = request.input('password')
    await user.save()

    response.send({
      data: user,
      token: (await auth.authenticator('jwtUser').generate(user)).token
    })
  }
}

module.exports = RegisterController
