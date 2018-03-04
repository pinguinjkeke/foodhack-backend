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
  Route.get('achievements/:id(\d+)', 'User/AchievementController.show')
  Route.get('achievements/latest', 'User/AchievementController.latest')
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
  Route.post('achievementSteps', 'Company/Achievement/AchievementController.storeStep')
})
  .prefix('api/v1/company')
  .middleware(['auth:jwtCompany'])

Route.group(() => {
  Route.post('check-repost', 'VkController.CheckRepost')
  Route.post('check-subscription', 'VkController.CheckSubscription')
  Route.post('check-mention', 'VkController.CheckMention')
  Route.get('login', 'User/Auth/VkLoginController.login')
  Route.get('register', 'User/Auth/VkRegisterController.register')
  Route.post('users', 'VkController.GetUsers')
  Route.post('achievements', 'VkController.GetAchievements')
})
  .prefix('api/v1/vk')
