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
}

module.exports = Company
