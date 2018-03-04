'use strict'

const moment = require('moment')

const Database = use('Database')
const Schema = use('Schema')

class CompanySchema extends Schema {
  up () {
    this.create('companies', (table) => {
      table.increments()
      table.string('name', 80)
      table.string('email', 254).unique()
      table.string('password', 60)
      table.timestamps()
    })

    this.schedule(async (trx) => {
      const now = moment().format('YYYY-MM-DD HH:mm:ss')

      await Database.table('companies')
        .transacting(trx)
        .insert({ name: 'Партия еды', email: 'partiya@edi.ru', password: '87538753' })
    })
  }

  down () {
    this.drop('companies')
  }
}

module.exports = CompanySchema
