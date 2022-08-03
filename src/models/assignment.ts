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

    @Column()
    userId: number

    @Column()
    coursegradeId: number

    @ManyToOne(() => User, (user) => user.id, { cascade: true })
    @JoinColumn({ name: 'userId' })
    user: User

    @ManyToOne(() => CourseGrade, (coursegrade) => coursegrade.id, { cascade: true })
    @JoinColumn({ name: 'coursegradeId' })
    coursegrade: CourseGrade

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}