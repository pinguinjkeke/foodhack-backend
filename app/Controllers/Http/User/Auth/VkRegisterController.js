'use strict'

const User = use('App/Models/User')

class VkRegisterController {

  async register ({ request, response, auth }) {

    const user = new User()
    user.email = request.input('email')
    user.password = new Date().getTime().toString()
    user.vk_id = request.input('user_id')
    await user.save()

    response.send({
      data: user,
      token: (await auth.authenticator('jwtUser').generate(user)).token
    })
  }
}

module.exports = VkRegisterController
