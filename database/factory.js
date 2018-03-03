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

Factory.blueprint('App/Models/Achievement', async (faker) => {
  return {
    name: faker.sentence(),
    description: faker.paragraph(),
    image: faker.url({ path: 'images', extensions: ['gif', 'jpeg', 'png'] }),
    reward: faker.bool() ? faker.paragraph() : null
  }
})
