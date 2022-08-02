import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

import { Assignment } from './assignment'

dotenv.config()

export const saltRounds = parseInt(process.env.SALT_ROUNDS, 10)

@Entity()
export class Admin extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @OneToMany(() => Assignment, (assignment) => assignment.id)
    assignmments: Assignment[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, saltRounds)
    }
}