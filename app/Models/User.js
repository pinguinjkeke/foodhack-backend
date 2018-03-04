'use strict'

const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeCreate', 'User.hashPassword')
  }

  static get hidden () {
    return ['password']
  }

  achievements () {
    return this.belongsToMany('App/Models/Achievement')
      .withPivot(['step', 'confirmed'])
  }
}

module.exports = User
