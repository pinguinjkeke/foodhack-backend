'use strict'

const Env = use('Env')

module.exports = {
  ally: {
    vk: {
      clientId: Env.get('VK_CLIENT_ID'),
      clientSecret: Env.get('VK_CLIENT_SECRET'),
      redirectUri: `${Env.get('APP_URL')}/api/v1/vk/authenticated`
    }
  }
}
