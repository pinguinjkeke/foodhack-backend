'use strict'

const Schema = use('Schema')

class AchievementTypeSchema extends Schema {
  up () {
    this.create('achievement_types', (table) => {
      table.increments()
      table.string('name')
      table.string('code')
      table.timestamps()
    })
  }

  down () {
    this.drop('achievement_types')
  }
}

module.exports = AchievementTypeSchema
