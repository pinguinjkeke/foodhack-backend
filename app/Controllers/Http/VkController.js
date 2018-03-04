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
}

module.exports = VkController
