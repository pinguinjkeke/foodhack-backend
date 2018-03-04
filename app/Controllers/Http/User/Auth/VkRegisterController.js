'use strict'

const User = use('App/Models/User')

class VkRegisterController {

  async register ({ request, response, auth }) {

    const user = new User()
    user.email = request.input('email')
    user.password = new Date().getTime().toString()
    await user.save()

    response.send({
      data: user,
      token: (await auth.authenticator('jwtUser').generate(user)).token
    })
  }
}

module.exports = VkRegisterController
