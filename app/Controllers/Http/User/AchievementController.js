'use strict'

const Achievement = use('App/Models/Achievement')

class AchievementController {
  async index ({ auth }) {
    const user = await auth.getUser()
    const achievements = await Achievement.query()
      .with('users', builder => builder.where('id', user.id).select('id'))
      .with('achievementType', builder => builder.select(['id', 'name', 'code']))
      .withCount('achievementSteps')
      .fetch()

    const formattedAchievements = achievements.toJSON().map((achievement) => {
      if (achievement.users && achievement.users.length) {
        achievement.step = achievement.users[0].pivot.step
        delete achievement.users
      }

      if (achievement.__meta__) {
        achievement.steps_count = achievement.__meta__.achievementSteps_count
        delete achievement.__meta__
      }

      delete achievement.created_at
      delete achievement.updated_at

      return achievement
    })

    return {
      data: formattedAchievements,
    }
  }

  async show ({ auth, params }) {
    const user = await auth.getUser()
    const achievement = Achievement.query()
      .with('users', builder => builder.where('id', user.id).select('id'))
      .with('achievementType', builder => builder.select(['id', 'name', 'code']))
      .with('achievementSteps', builder => builder.select(
        [
          'id',
          'name',
          'description',
          'achievement_id',
          'vk_owner_id',
          'vk_post_id'
        ]))
      .fetch()

    return {
      data: achievement,
    }
  }

  async latest ({ auth }) {
    const user = await auth.getUser()

    const achievement = await user.achievements()
      .wherePivot('confirmed', false)
      .first()

    await achievement.users().detach(user.id)
    await achievement.users().attach([user.id], (row) => {
      row.confirmed = true
    })

    return {
      data: achievement
    }
  }
}

module.exports = AchievementController
