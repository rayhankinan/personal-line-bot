import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Class extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    major: string

    @Column()
    year: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}