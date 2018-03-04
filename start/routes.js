'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.on('/').render('welcome')

// User route group w/o auth
Route.group(() => {
  Route.post('auth/login', 'User/Auth/LoginController.login')
  Route.post('auth/register', 'User/Auth/RegisterController.register')
})
  .prefix('api/v1/user')

// Logged in User route group
Route.group(() => {
  Route.get('achievements', 'User/AchievementController.index')
})
  .prefix('api/v1/user')
  .middleware(['auth:jwtUser'])

// Company route group w/o auth
Route.group(() => {
  Route.post('auth/login', 'Company/Auth/LoginController.login')
  Route.post('auth/register', 'Company/Auth/RegisterController.register')
})
  .prefix('api/v1/company')

// Logged in Company route group
Route.group(() => {
  Route.resource('achievements', 'Company/Achievement/AchievementController').apiOnly()
})
  .prefix('api/v1/company')
  .middleware(['auth:jwtCompany'])
