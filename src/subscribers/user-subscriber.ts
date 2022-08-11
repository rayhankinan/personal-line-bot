import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm'
import bcrypt from 'bcrypt'

import { User } from '../models/user'
import { bcryptConfig } from '../config/bcrypt-config'

const saltRounds = bcryptConfig.saltRounds

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