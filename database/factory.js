'use strict'

const request = require('http')
const { formatPhone } = require('../helpers')
const { downloadFile } = require('../app/helpers')

const Factory = use('Factory')
const Helpers = use('Helpers')

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
    password: '87538753',
    vk_id: ''
  }
})

Factory.blueprint('App/Models/Achievement', async (faker) => {
  const hot = faker.bool({ likelihood: 10 })
  const imageUrl = `http://lorempixel.com/355/${hot ? 190 : 50}/`
  const imagePath = `/images/achievement-${new Date().getTime()}.jpeg`
  await downloadFile(imageUrl, Helpers.publicPath(imagePath))

  return {
    hot,
    name: faker.name(),
    description: faker.paragraph(),
    image: imagePath,
    reward: faker.integer({ min: 1, max: 100 })
  }
})

Factory.blueprint('App/Models/AchievementStep', async (faker) => {
  return {
    name: faker.name(),
    description: faker.bool() ? faker.paragraph() : null,
    vk_owner_id: "-20629724",
    vk_post_id: "1053923"
  }
})
