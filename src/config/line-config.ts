import { MiddlewareConfig } from '@line/bot-sdk'
import dotenv from 'dotenv'

dotenv.config()

export const lineConfig: MiddlewareConfig = {
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
}