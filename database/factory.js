'use strict'

const Factory = use('Factory')

Factory.blueprint('App/Models/Company', async (faker) => {
  return {
    email: faker.email(),
    password: '87538753',
    name: faker.company()
  }
})

Factory.blueprint('App/Models/User', async (faker) => {
  return {
    email: faker.email(),
    password: '87538753'
  }
})

