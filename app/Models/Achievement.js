'use strict'

const Model = use('Model')

class Achievement extends Model {
  achievementSteps () {
    return this.hasMany('App/Models/AchievementSteps')
  }

  achievementType () {
    return this.belongsTo('App/Models/AchievementType')
  }

  company () {
    return this.belongsTo('App/Models/Company')
  }

  users () {
    return this.belongsToMany('App/Models/User')
  }
}

module.exports = Achievement
