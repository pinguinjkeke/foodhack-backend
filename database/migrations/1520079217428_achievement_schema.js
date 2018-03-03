'use strict'

const Schema = use('Schema')

class AchievementSchema extends Schema {
  up () {
    this.create('achievements', (table) => {
      table.increments()
      table.integer('company_id').unsigned().references('id').inTable('companies')
      table.string('code')
      table.string('name')
      table.text('description').nullable()
      table.string('image').nullable()
      table.text('reward').nullable()
      table.integer('achievement.type').unsigned().references('id').inTable('achievement_types')
      table.timestamps()
    })

    this.create('achievement_user', (table) => {
      table.integer('achievement_id').unsigned().references('id').inTable('achievements')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('step').nullable()
    })
  }

  down () {
    this.drop('achievements')
  }
}

module.exports = AchievementSchema
