'use strict'

const Model = use('Model')

class Achievement extends Model {
  static boot () {
    super.boot()

    this.addTrait('@provider:Lucid/Slugify', {
      fields: { code: 'name' },
      strategy: 'dbIncrement'
    })
  }

  achievementSteps () {
    return this.hasMany('App/Models/AchievementStep')
  }

  company () {
    return this.belongsTo('App/Models/Company')
  }

  users () {
    return this.belongsToMany('App/Models/User')
      .withPivot(['step', 'confirmed'])
  }
}

module.exports = Achievement
