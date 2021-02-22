import { IncomingHttpHeaders } from "http"
import { NextFunction, Request, Response } from "express"
import { errorCatcher } from "../modules/errors"
import { Services } from "../config"

export const secureRoutes = (
  { auth, user: userRepo }: Services,
  baseApiURL: string
) =>
  errorCatcher(async (req: Request, res: Response, next: NextFunction) => {
    const token = getAuthToken(req.headers)
    if (token === null && doesNotRequireAuthentication(req, baseApiURL)) {
      return next()
    }
    const authUserId = await auth.verifyToken(token ?? "")
    const user = await userRepo.getUserById(authUserId)

    ;(req as any).authUserId = authUserId
    ;(req as any).authUserName = user?.name
    ;(req as any).companyId = user?.companyId

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
    (path.startsWith(`${baseApiURL}/auth/signup`) && method === "POST") ||
    (path.startsWith(`${baseApiURL}/companies`) && method === "GET") // temporarily allow
  )
}
