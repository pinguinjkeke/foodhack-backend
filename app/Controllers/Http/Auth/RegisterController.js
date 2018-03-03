'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class RegisterController {
  async register ({ request, response, auth }) {
    const user = new User()
    user.email = request.input('email')
    user.password = request.input('password')
    await user.save()

    response.send({
      data: user,
      token: (await auth.generate(user)).token
    })
  }
}

module.exports = RegisterController
