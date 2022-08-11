import dotenv from 'dotenv'

dotenv.config()

export const serverConfig: { port: number } = {
    port: +process.env.PORT || 8080
}