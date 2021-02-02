import { isThursday } from 'date-fns'

class AppError {
  public readonly message: string

  public readonly statusCode: number

  public readonly code: number

  constructor(message: string, code: number, statusCode = 400) {
    this.message = message
    this.statusCode = statusCode
    this.code = code
  }
}

export default AppError
