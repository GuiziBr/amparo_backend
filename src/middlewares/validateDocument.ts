import { Request, Response, NextFunction } from 'express'
import { isValid } from 'cpf'
import AppError from '../errors/AppError'

export default function validateDocument(request: Request, _response: Response, next: NextFunction): void {
  const document = request.body.document || request.body.patient || request.params.document
  if (!isValid(document)) throw new AppError('Document should be a valid CPF')
  return next()
}
