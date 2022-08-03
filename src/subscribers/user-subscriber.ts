import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

import { User } from '../models/user'

dotenv.config()

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10)

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {

    listenTo() {
        return User;
    }

    async beforeInsert(event: InsertEvent<User>) {
        event.entity.password = await bcrypt.hash(event.entity.password, saltRounds)
    }

    async beforeUpdate(event: UpdateEvent<User>) {
        if (event.entity.password !== event.databaseEntity.password) {
            event.entity.password = await bcrypt.hash(event.entity.password, saltRounds)
        }
    }
}