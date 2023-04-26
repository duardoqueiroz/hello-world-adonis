import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class UserPolicy extends BasePolicy {
  public async update(user1: User, user2: User) {
    return user1.id === user2.id
  }
  public async delete(user1: User, user2: User) {}
}
