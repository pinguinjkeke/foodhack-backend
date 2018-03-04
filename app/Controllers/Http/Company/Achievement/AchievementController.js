'use strict'

const Achievement = use('App/Models/Achievement')
const AchievementStep = use('App/Models/AchievementStep')

class AchievementController {
  async index ({ auth, request }) {
    const company = await auth.getUser()

    return await Achievement.query()
      .whereHas('company', (builder) => builder.where('id', company.id))
      .paginate(parseInt(request.input('page')))
  }

  async show ({ params, auth, response }) {
    const company = await auth.getUser()
    const achievement = await Achievement.find(params.id)

    if (achievement.company_id !== company.id) {
      return response.status(403)
    }

    return achievement
  }

  async store ({ auth, request }) {
    const company = await auth.getUser()
    const achievement = new Achievement()

    achievement.name = request.input('name')
    achievement.description = request.input('description')
    achievement.reward = request.input('reward')
    achievement.achievementType().associate(request.input('achievement_type_id'))
    achievement.company().associate(company)

    await achievement.save()

    return achievement
  }

  /*
  request:
    achievement_id
    name description vk_owner_id vk_post_id
   */
  async storeStep ({ auth, request }) {

    const achievement = Achievement.find(request.input('achievement_id'))

    const achievementStep = new AchievementStep()

    achievementStep.name = request.input('name')
    achievementStep.description = request.input('description')
    achievementStep.vk_owner_id = request.input('vk_owner_id')
    achievementStep.vk_post_id = request.input('vk_post_id')
    achievementStep.achievement().associate(achievement.id)

    await achievementStep.save()

    return achievementStep
  }

  async update ({ params, auth, request, response }) {
    const achievement = await Achievement.find(params.id)
    const company = await auth.getUser()

    if (achievement.company_id !== company.id) {
      return response.status(403)
    }

    const { name, description, reward } = request
    achievement.name = name
    achievement.description = description
    achievement.reward = reward
    achievement.achievementType().associate(request.input('achievement_type_id'))

    await achievement.save()

    return achievement
  }

  async destroy ({ params, auth, response }) {
    const achievement = Achievement.find(params.id)
    const company = await auth.getUser()

    if (company.id !== achievement.company_id) {
      return response.status(403)
    }

    await achievement.destroy()

    response.send()
  }
}

module.exports = AchievementController
