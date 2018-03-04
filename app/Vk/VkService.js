'use strict'

const Achievement = use('App/Models/Achievement')
const AchievementStep = use('App/Models/AchievementStep')
const User = use('App/Models/User')
const Database = use('Database')

//const VK = require('vksdk');
const vkapi = new (require('node-vkapi'))(
  {
    accessToken: '741bcab2741bcab2741bcab270747a58877741b741bcab22e80b5cc176d4ce8b8bc9ec0',
    appSecret: 'YETwPOKfN2gVL0zQFmU6',
    appId: 6394421
  });

// CheckRepost(14603321, '-20629724', '1053923')

class VkService {

  static async GetUsers() {

    return await User.query()
  }

  static async GetAchievements() {

    return await Achievement.query()
      .with('achievementType', builder => builder.select(['id', 'name', 'code']))
      .with('achievementSteps', builder => builder.select(
        [
          'id',
          'name',
          'description',
          'achievement_id',
          'vk_owner_id',
          'vk_post_id'
        ]));
  }

  static async GetAchievementSteps(achievementId) {


  }

  /*
  user_id - id пользователя, который делает репост
  owner_id - id группы, из которой нужно сделать репост числовое id или строка
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
