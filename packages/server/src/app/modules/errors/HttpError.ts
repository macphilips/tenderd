export type ErrorMessage = {
  [key: string]: string | ((message?: string) => string)
}

export const errors: ErrorMessage = {
  USR_01: (field?: string) => `${field} already exists`,
  USR_02: "Contact with given ID doesn't exists",
  USR_03: "Entity with given ID doesn't exists",
  AUTH_01: "You are not authorized to make this request"
}

class HttpError extends Error {
  code: keyof ErrorMessage
  field?: string
  statusCode: number
  constructor(
    code: keyof ErrorMessage,
    statusCode = 500,
    field?: string,
    message?: string
  ) {
    super()
    const errorMessage = message || ""
    this.code = code
    this.field = field
    const error = errors[code]
    if (error instanceof Function) {
      this.message = error(field) || errorMessage
    } else {
      this.message = error
    }
    this.statusCode = statusCode
  }
}

export default HttpError
