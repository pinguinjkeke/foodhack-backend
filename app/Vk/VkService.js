'use strict'

//const VK = require('vksdk');
const vkapi = new (require('node-vkapi'))(
  {
    accessToken: '94f1a7ff94f1a7ff94f1a7ff34949035ca994f194f1a7ffce6b155d76ac0134ef5e60f3',
    appSecret: 'YETwPOKfN2gVL0zQFmU6',
    appId: 6394421
  });

// CheckRepost(14603321, '-20629724', '1053923')

class VkService {

  /*
  user_id - id пользователя, который делает репост
  owner_id - id группы, из которой нужно сделать репост (только числовое id)
  post_id - id поста в группе
   */
  static async CheckRepost(user_id, owner_id, post_id) {

    var reposted = false

    try {
      const posts = await vkapi.call(
        'wall.get',
        {
          owner_id: user_id,
          count: 50
        })

      posts.items.forEach(post => {
        if (post.copy_history != null) {
          var copy_history = post.copy_history[0]
          if (copy_history.id == post_id && copy_history.owner_id == owner_id) {
            reposted = true
            return
          }
        }
      });
    }
    catch (error) {

    }

    return reposted
  }

  /*
  user_id - id пользователя, который подписался
  group_id - id группы, на которую подписан (текст или число)
   */
  static async CheckSubscription(user_id, group_id) {

    var subscribed = false

    try {
      const isMember = await vkapi.call(
        'groups.isMember',
        {
          user_id: user_id,
          group_id: group_id
        })

      subscribed = isMember == 1
    }
    catch(error) {

    }

    return subscribed
  }

  static async CheckMention(user_id, group_id) {

    var mentioned = false

    try {
      vkapi.authorize(
        {
          login:    '',
          password: '',
          scope:    'wall, offline'
        }
      )

      const mentions = await vkapi.call(
        'newsfeed.getMentions',
        {
          owner_id: group_id
        }
      )

      mentions.items.forEach(mention => {
        if (mention.from_id == user_id) {
          mentioned = true
          return
        }
      })
    }
    catch(error) {

    }

    return mentioned
  }
}

module.exports = VkService
