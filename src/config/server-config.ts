import dotenv from 'dotenv'

dotenv.config()

export const serverConfig: { port: number } = {
    port: parseInt(process.env.PORT, 10) || 8080
}