import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    name: schema.string({}, [rules.minLength(3), rules.maxLength(255), rules.required()]),
    email: schema.string({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
      rules.required(),
    ]),
    password: schema.string({}, [rules.minLength(6), rules.maxLength(180), rules.required()]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'name.required': 'O nome é obrigatório',
    'name.minLength': 'O nome deve ter no mínimo 3 caracteres',
    'name.maxLength': 'O nome deve ter no máximo 255 caracteres',
    'email.required': 'O e-mail é obrigatório',
    'email.email': 'O e-mail deve ser válido',
    'email.unique': 'O e-mail já está em uso',
    'password.required': 'A senha é obrigatória',
    'password.minLength': 'A senha deve ter no mínimo 6 caracteres',
    'password.maxLength': 'A senha deve ter no máximo 180 caracteres',
  }
}
