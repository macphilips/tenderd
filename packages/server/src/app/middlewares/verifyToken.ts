import AuthService from "../modules/auth/auth.service"
import { IncomingHttpHeaders } from "http"
import { NextFunction, Request, Response } from "express"
import { errorCatcher } from "../modules/errors"

export const secureRoutes = (auth: AuthService, baseApiURL: string) =>
  errorCatcher(async (req: Request, res: Response, next: NextFunction) => {
    const token = getAuthToken(req.headers)
    if (token === null && doesNotRequireAuthentication(req, baseApiURL)) {
      return next()
    }
    ;(req as any).authUserId = await auth.verifyToken(token ?? "")
    next()
  })

const getAuthToken: (headers: IncomingHttpHeaders) => string | null = (
  headers: IncomingHttpHeaders
) => {
  const [bearer, token] = headers.authorization?.split(" ") ?? ""
  if (bearer === "Bearer") {
    return token
  } else {
    return null
  }
}

const doesNotRequireAuthentication = (request: Request, baseApiURL: string) => {
  const { path, url, method } = request
  return (
    (path.startsWith("/docs/api") && method === "GET") ||
    path.startsWith(`${baseApiURL}/auth/signup`)
  )
}
