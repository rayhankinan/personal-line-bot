import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { User } from './user'
import { CourseGrade } from './course-grade'

@Entity()
export class Assignment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    deadline: Date

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'userId'})
    user: User

    @ManyToOne(() => CourseGrade, (coursegrade) => coursegrade.id)
    @JoinColumn({ name: 'coursegradeId'})
    coursegrade: CourseGrade

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}