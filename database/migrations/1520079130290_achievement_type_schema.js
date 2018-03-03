'use strict'

const moment = require('moment')

const Database = use('Database')
const Schema = use('Schema')

class AchievementTypeSchema extends Schema {
  up () {
    this.create('achievement_types', (table) => {
      table.increments()
      table.string('name')
      table.string('code')
      table.timestamps()
    })

    this.schedule(async (trx) => {
      const now = moment().format('YYYY-MM-DD HH:mm:ss')
      const rows = [
        { name: 'Лайк ВК', code: 'vk_like' },
        { name: 'Репост ВК', code: 'vk_repost' },
        { name: 'Другое', code: 'other' }
      ].map(row => ({ ...row, created_at: now, updated_at: now }))

      await Database.table('achievement_types')
        .transacting(trx)
        .insert(rows)
    })
  }

  down () {
    this.drop('achievement_types')
  }
}

module.exports = AchievementTypeSchema
