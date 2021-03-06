'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', table => {
      table.increments()
      table.string('email', 254).unique().nullable()
      table.string('phone', 254).unique().nullable()
      table.string('password', 60)
      table.integer('points').unsigned().default(0)
      table.string('vk_id', 50).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
