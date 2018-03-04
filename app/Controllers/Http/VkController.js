'use strict'

const VkService = use('App/Vk/VkService')
const Achievement = use('App/Models/Achievement')
const AchievementStep = use('App/Models/AchievementStep')
const VkService = use('App/Vk/VkService')

class VkController {

  /*
  request params:
  achievement_id
   */
  async CheckAchievement({request, auth}) {

    const achievementId = request.input('achievementId')
    const achievement = Achievement.find(achievementId)
    const steps = achievement.achievementSteps()

    var achievementUnlocked = false
    var userId = auth.user.vk_id
    var stepsFinished = []

    steps.forEach(async step => {

      const vk_owner_id = step.vk_owner_id
      const vk_post_id = step.vk_post_id

      var stepFinished = false;

      switch (achievement.achievementType().code) {
        case 'vk_repost':

          var reposted = await VkService.CheckRepost(userId, vk_owner_id, vk_post_id)
          if (reposted) {
            stepsFinished.push(step.id)
            stepFinished = true
          }

          break;
        case 'vk_subscription':

          var subscribed = await VkService.CheckSubscription(userId, vk_owner_id)
          if (subscribed) {
            stepsFinished.push(step.id)
            stepFinished = true
          }

          break;
        case 'vk_mention':

          var mentioned = await VkService.CheckMention(userId, vk_owner_id)
          if (mentioned) {
            stepsFinished.push(step.id)
            stepFinished = true
          }

          break;

        default:
          break;
      }

      if (stepFinished) {
        var insertRes = await Database.table('achievement_user').insert(
          {
            'achievement_id': achievementId,
            'user_id': userId,
            'step': step.id
          }
        )
      }
    });

    if (stepsFinished.length == steps.length) {
      achievementUnlocked = true
    }

    return achievementUnlocked
  }

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
