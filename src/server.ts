import express from 'express'
import { routes } from './routes'
import { errorHandler } from './middlewares/error-handler'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

const PORT = 3333

const app = express()

const swaggerDocument = YAML.load('./docs/openapi.yaml')

app.use(express.json())
app.use(routes)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    console.log(`📚 Swagger docs available at http://localhost:${PORT}/docs`)
})
