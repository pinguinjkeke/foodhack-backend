'use strict'

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
    const steps = achievement.achievementSteps

    const user = await auth.getUser()

    var achievementUnlocked = false
    var userId = user.vk_id
    var stepsFinished = []

    try {
      steps.forEach(async step => {

        const vk_owner_id = step.vk_owner_id
        const vk_post_id = step.vk_post_id

        var stepFinished = false;

        switch (step.achievementType().code) {
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
      });

      if (stepsFinished.length > 0) {

        var achievementUser = await Database.table('achievement_user')
          .whereHas('achievement_id', achievementId)
          .whereHas('user_id', userId)

        if (!achievementUser) {
          var res = await Database.table('achievement_user').insert(
            {
              'achievement_id': achievementId,
              'user_id': userId,
              'step': stepsFinished.length
            }
          )
        }
        else {
          var res = await Database.table('achievement_user').update(
            {
              'achievement_id': achievementId,
              'user_id': userId,
              'step': stepsFinished.length
            }
          )
        }
      }

      if (stepsFinished.length == steps.length) {
        achievementUnlocked = true
      }
    }
    catch(error) {
      console.log(error);
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
