'use strict'

const User = use('App/Models/User')

class VkAuthController {
  async login ({ ally, request, auth }) {
    return {
      data: {
        url: await ally.driver('vk').getRedirectUrl()
      }
    }
  }

  async finish ({ ally, auth, request }) {
    const vkUser = await ally.driver('vk').getUser()

    let user = await User.findBy('email', vkUser.getEmail())

    if (!user) {
      user = new User()
      user.email = vkUser.getEmail()
      user.vk_id = vkUser.getId()
      user.password = new Date().getTime().toString()
      await user.save()
    }

    const { token } = await auth.authenticator('jwtUser').generate(user)

    return {
      data: user,
      token
    }
  }
}

module.exports = VkAuthController
