import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { Application } from "express"

const apiDocsOptions = {
  customSiteTitle: "Tenderd Fullstack challenge API Docs"
}

const host = process.env.BASE_HOST

export default (app: Application, basePath: string) => {
  const config = swaggerJSDoc({
    swaggerDefinition: {
      info: {
        title: "Tenderd Fullstack Challenge",
        version: "1.0.0",
        description: "API Docs (v1)"
      },
      schemes: ["http", "https"],
      host: `${host}`,
      basePath: `${basePath}`,
      produces: ["application/json"],
      consumes: ["application/json"],
      securityDefinitions: {},
      security: []
    },
    apis: ["./**/*.routes.ts","./**/*.controller.ts"]
  })

  app.use("/docs/api", swaggerUi.serve, swaggerUi.setup(config, apiDocsOptions))
}
