import dotenv from 'dotenv'

dotenv.config()

export const bcryptConfig: { saltRounds: number } = {
    saltRounds: parseInt(process.env.SALT_ROUNDS, 10)
}