'use strict'

const chance = require('chance')()

const AchievementType = use('App/Models/AchievementType')
const Factory = use('Factory')

class CompanySeeder {
  async run () {
    await this.createCompaniesWithAchievements()
  }

  async createCompaniesWithAchievements () {
    const companies = await Factory.model('App/Models/Company').createMany(10)

    for (let i = 0; i < companies.length; i++) {
      await this.createCompanyAchievements(companies[i])
    }
  }

  async createCompanyAchievements (company) {
    const achievementsCount = chance.integer({ min: 5, max: 50 })

    for (let i = 0; i < achievementsCount; i++) {
      const achievement = await Factory.model('App/Models/Achievement').make()
      const randomAchievementType = await AchievementType.query().orderByRaw('RANDOM()').first()

      await achievement.achievementType().associate(randomAchievementType)
      await achievement.company().associate(company)
      await achievement.save()

      await this.createAchievementSteps(achievement)
    }
  }

  async createAchievementSteps (achievement) {
    const steps = await Factory.model('App/Models/AchievementStep').makeMany(chance.integer({ min: 1, max: 5 }))

    for (let i = 0; i < steps.length; i++) {
      await steps[i].achievement().associate(achievement)
      await steps[i].save()
    }
  }
}

module.exports = CompanySeeder
