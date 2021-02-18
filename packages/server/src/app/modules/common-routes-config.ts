import express from "express"

export abstract class CommonRoutesConfig {
  protected constructor(
    protected app: express.Application,
    protected name: string,
    protected baseUrl: string
  ) {
    this.configureRoutes()
  }

  getName() {
    return this.name
  }

  abstract configureRoutes(): express.Application
}
