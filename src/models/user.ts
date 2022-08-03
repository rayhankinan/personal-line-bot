import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { Assignment } from './assignment'

export enum UserRole {
    ADMIN = 'admin',
    EDITOR = 'editor'
}

@Entity()
export class User extends BaseEntity {
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
}