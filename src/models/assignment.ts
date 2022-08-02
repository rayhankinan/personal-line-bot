import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Admin } from './admin'
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

    @ManyToOne(() => Admin, (admin) => admin.id)
    @JoinColumn({ name: 'adminId'})
    admin: Admin

    @ManyToOne(() => CourseGrade, (coursegrade) => coursegrade.id)
    @JoinColumn({ name: 'coursegradeId'})
    coursegrade: CourseGrade

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}