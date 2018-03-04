'use strict'

const Schema = use('Schema')

class AchievementStepSchema extends Schema {
  up () {
    this.create('achievement_steps', (table) => {
      table.increments()
      table.integer('achievement_id').unsigned().references('id').inTable('achievements')
      table.string('name')
      table.string('description').nullable()
      table.string('vk_owner_id').nullable()
      table.string('vk_post_id').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('achievement_steps')
  }
}

module.exports = AchievementStepSchema
