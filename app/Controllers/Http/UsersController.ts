import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/User/StoreValidator'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const users = await User.all()
    return response.ok(users)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const user = await User.create(data)
    return response.status(201).json(user)
  }

  public async show({ params, response }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ error: 'User not found' })
    }
    return response.ok(user)
  }

  public async update({ request, params, response, bouncer }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ error: 'User not found' })
    }
    await bouncer.with('UserPolicy').authorize('update', user)
    const data = request.only(['name', 'email', 'password'])
    user.merge(data)
    await user.save()
    return response.ok(user)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ error: 'User not found' })
    }
    await user.delete()
    return response.noContent()
  }
}
