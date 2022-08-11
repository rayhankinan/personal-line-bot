import { ClientConfig, MiddlewareConfig } from '@line/bot-sdk'
import dotenv from 'dotenv'

dotenv.config()

export const middlewareConfig: MiddlewareConfig = {
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
}

export const clientConfig: ClientConfig = {
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
}