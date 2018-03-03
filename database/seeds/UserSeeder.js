'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const chance = require('chance')()

const Achievement = use('App/Models/Achievement')
const Factory = use('Factory')

class UserSeeder {
  async run () {
    await this.createUsers()
  }

  async createUsers () {
    const users = (await Factory.model('App/Models/User').createMany(50))

    for (let i = 0; i < users.length; i++) {
      await this.attachAchievementsToUser(users[i])
    }
  }

  async attachAchievementsToUser (user) {
    const achievements = await Achievement.query()
      .with('achievementSteps')
      .limit(chance.integer({ min: 1, max: 50 }))
      .fetch()

    await user.achievements().attach(achievements.rows.map(({ id }) => id), (row) => {
      const achievement = achievements.rows.find(({ id }) => id === row.achievement_id)

      row.step = chance.integer({ min: 0, max: achievement.toJSON().achievementSteps.length })
    })
  }
}

module.exports = UserSeeder
