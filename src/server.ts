import { app } from './app'
import { dataSource } from './data-source'
import { serverConfig } from './config/server-config'

const port = serverConfig.port
const server = app.server

dataSource.initialize()
    .then(async () => {
        server.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })