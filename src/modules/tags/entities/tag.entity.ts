import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'tags' })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ type: 'character varying', nullable: true })
  description: string | null

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
