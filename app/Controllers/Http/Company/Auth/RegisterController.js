'use strict'

const Company = use('App/Models/Company')
const Hash = use('Hash')

class RegisterController {
  async register ({ request, response, auth }) {
    const company = new Company()
    company.name = request.input('name')
    company.email = request.input('email')
    company.password = request.input('password')
    await company.save()

    response.send({
      data: company,
      token: (await auth.authenticator('jwtCompany').generate(company)).token
    })
  }
}

module.exports = RegisterController
