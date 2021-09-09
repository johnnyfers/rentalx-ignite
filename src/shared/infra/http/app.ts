import 'dotenv/config'

import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import { router } from './routes/index'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../../../swagger.json'
import '../typeorm'
import '../../container'
import { AppError } from '../../errors/AppError'
import createConnection from '../typeorm/index'
import Upload from '../../../config/Upload'

createConnection()
const app = express()
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use('/avatar', express.static(`${Upload.tmpFolder}/avatar`))
app.use('/cars', express.static(`${Upload.tmpFolder}/avatar`))


app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message })
    }
    return res.status(500).json({ status: 'error', message: `internal server error - ${err.message}` })
})

export {app}
