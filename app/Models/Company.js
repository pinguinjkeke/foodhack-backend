'use strict'

const Model = use('Model')

class Company extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeCreate', 'User.hashPassword')
  }
}

module.exports = Company
