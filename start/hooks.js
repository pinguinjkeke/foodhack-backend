const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersRegistered(() => {
  const AllyExtended = use('@mikield/ally-extended')
  AllyExtended.use('vk')
})
