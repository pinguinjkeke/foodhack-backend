'use strict'

const { formatPhone } = require('../helpers')

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
    phone: formatPhone(faker.phone()),
    password: '87538753'
  }
})

Factory.blueprint('App/Models/Achievement', async (faker) => {
  return {
    hot: faker.bool({ likelihood: 10 }),
    name: faker.name(),
    description: faker.paragraph(),
    image: faker.url({ path: 'images', extensions: ['gif', 'jpeg', 'png'] }),
    reward: faker.integer({ min: 1, max: 100 })
  }
})

Factory.blueprint('App/Models/AchievementStep', async (faker) => {
  return {
    name: faker.name(),
    description: faker.bool() ? faker.paragraph() : null
  }
})
