'use strict'

const VkService = use('App/Vk/VkService')

class VkController {

  async CheckRepost({request}) {

    return await VkService.CheckRepost(
      request.input('user_id'),
      request.input('owner_id'),
      request.input('post_id'))
  }

  async CheckSubscription({request}) {
    return await VkService.CheckSubscription(
      request.input('user_id'),
      request.input('group_id'))
  }

  async CheckMention({request}) {
    return await VkService.CheckMention(
      request.input('user_id'),
      request.input('group_id')
    )
  }

  // for testing purposes

  async GetUsers({request}) {
    return await VkService.GetUsers()
  }

  async GetAchievements({request}) {
    return await VkService.GetAchievements()
  }
}

module.exports = VkController
