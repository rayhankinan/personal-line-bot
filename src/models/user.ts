import { AfterLoad, BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

import { Assignment } from './assignment'

dotenv.config()

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10)

export enum UserRole {
    ADMIN = 'admin',
    EDITOR = 'editor'
}

@Entity()
export class User extends BaseEntity {
    private tempPassword: string

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true
    })
    username: string

    @Column()
    password: string

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.EDITOR
    })
    role: UserRole

    @OneToMany(() => Assignment, (assignment) => assignment.user)
    assignments: Assignment[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.tempPassword !== this.password) {
            this.password = await bcrypt.hash(this.password, saltRounds)
        }
    }

    @AfterLoad()
    loadTempPassword() {
        this.tempPassword = this.password
    }
}