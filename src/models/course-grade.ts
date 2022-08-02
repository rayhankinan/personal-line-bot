import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Course } from './course'
import { Grade } from './grade'

@Entity()
export class CourseGrade extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    lecturer: string

    @ManyToOne(() => Course, (course) => course.id)
    @JoinColumn({ name: 'courseId' })
    course: Course

    @ManyToOne(() => Grade, (grade) => grade.id)
    @JoinColumn({ name: 'gradeId' })
    grade: Grade

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}