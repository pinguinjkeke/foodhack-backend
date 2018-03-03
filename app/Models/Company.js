'use strict'

const Model = use('Model')

class Company extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeCreate', 'User.hashPassword')
  }

  static get hidden () {
    return ['password']
  }

  achievements () {
    return this.hasMany('App/Models/Achievement')
  }
}

module.exports = Company
