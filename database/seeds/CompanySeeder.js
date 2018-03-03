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
    const achievements = await Factory.model('App/Models/Achievement').makeMany(chance.integer({ min: 5, max: 50 }))

    for (let i = 0; i < achievements.length; i++) {
      const randomAchievementType = await AchievementType.query().orderByRaw('RANDOM()').first()

      await achievements[i].achievementType().associate(randomAchievementType)
      await achievements[i].company().associate(company)
      await achievements[i].save()

      await this.createAchievementSteps(achievements[i])
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
