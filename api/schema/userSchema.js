import { z } from 'zod'

const UserRegister = z.object({
  username: z.string({
    required_error: 'user is required',
    invalid_type_error: 'user must be a string'
  }).max(20, { message: 'Must be 20 or fewer characters long' }),
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be a string'
  }).min(6, { message: 'Must be 6 or more characters long' }),
  name: z.string({
    invalid_type_error: 'name must be a string'
  }).max(20, { message: 'Must be 20 or fewer characters long' }),
  lastname: z.string({
    invalid_type_error: 'lastName must be a string'
  }).max(20, { message: 'Must be 20 or fewer characters long' }),
  email: z.string({
    required_error: 'email is required',
    invalid_type_error: 'email must be a string'
  }).email().min(6, { message: 'Must be 6 or more characters long' })
})
const UserLogin = z.object({
username: z.string({
    required_error: 'user is required',
    invalid_type_error: 'user must be a string'
}).max(20, { message: 'Must be 20 or fewer characters long' }),
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be a string'
  }).min(6, { message: 'Must be 6 or more characters long' })
})


export function validUser (object) {

  return UserLogin.safeParse(object)
}
export function validRegisterUser (object) {

  return UserRegister.safeParse(object)
}
