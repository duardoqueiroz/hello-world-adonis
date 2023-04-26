import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/login', 'AuthController.store')
Route.delete('/logout', 'AuthController.destroy').middleware('auth')
Route.resource('users', 'UsersController')
  .apiOnly()
  .middleware({
    destroy: ['auth'],
    update: ['auth'],
  })
