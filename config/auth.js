'use strict'

module.exports = {
  authenticator: 'jwtUser',

  jwtUser: {
    serializer: 'lucid',
    model: 'App/Models/User',
    scheme: 'jwt',
    uid: 'email',
    password: 'password',
    options: {
      secret: 'self::app.appKey'
    }
  },

  jwtCompany: {
    serializer: 'lucid',
    model: 'App/Models/Company',
    scheme: 'jwt',
    uid: 'email',
    password: 'password',
    options: {
      secret: 'self::app.appKey'
    }
  },
}
