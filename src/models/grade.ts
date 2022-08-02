import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { CourseGrade } from './course-grade'

@Entity()
export class Grade extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    major: string

    @Column()
    year: number

    @OneToMany(() => CourseGrade, (coursegrade) => coursegrade.id)
    coursegrades: CourseGrade[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}