'use strict'

const Model = use('Model')

class AchievementStep extends Model {
  achievement () {
    return this.belongsTo('App/Models/Achievement')
  }
}

module.exports = AchievementStep
