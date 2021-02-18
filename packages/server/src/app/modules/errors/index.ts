import HttpError from "./HttpError"
import { Application, NextFunction, Request, Response } from "express"

export const errorCatcher = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) =>
  fn(req, res, next).catch((e: Error) => next(e))

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message
  ;({ message } = error)
  let statusCode
  let field
  let code
  if (error instanceof HttpError) {
    ;({ message, field, code, statusCode } = error)
  } else {
    statusCode = (error as any).status || 500
  }

  res.status(statusCode).json({
    message,
    field,
    code
  })
}

export const registerErrorHandler = (app: Application) => {
  app.use(errorHandler)
}
