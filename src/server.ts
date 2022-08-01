import dotenv from 'dotenv'
import { app } from './app'

dotenv.config()

const port = process.env.PORT || '8080'
const server = app.server

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})