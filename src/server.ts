import dotenv from 'dotenv'

import { app } from './app'
import { dataSource } from './data-source'
import { getErrorMessage } from './utils/error-util'

dotenv.config()

const port = parseInt(process.env.PORT, 10) || 8080
const server = app.server

dataSource.initialize()
    .then(async () => {
        server.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`)
        })
    })
    .catch((error) => {
        console.log(getErrorMessage(error))
    })