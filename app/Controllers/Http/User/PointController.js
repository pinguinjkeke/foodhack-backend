'use strict'

class PointController {
  async index ({ auth }) {
    const user = await auth.getUser()

    const achievements = await user.achievements()
      .wherePivot('step', '>', 0)
      .withCount('achievementSteps')
      .fetch()

    const points = achievements.toJSON().filter((achievement) => {
      return achievement.__meta__.achievementSteps_count === achievement.pivot.step
    }).reduce((carry, item) => {
      return parseInt(carry, 10) + parseInt(item.reward, 10)
    }, 0)

    return {
      data: points
    }
  }
}

module.exports = PointController
