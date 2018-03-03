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

Route.group(() => {
  Route.post('auth/login', 'User/Auth/LoginController.login')
  Route.post('auth/register', 'User/Auth/RegisterController.register')
}).prefix('api/v1/user')
