import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { User } from '../../users/entities'
import { Task } from '../../tasks/entities'

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ name: 'task_id' })
  taskId: number

  @ManyToOne(() => Task, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'task_id' })
  task: User | null

  @Column({ name: 'user_id', nullable: true })
  userId: number

  @ManyToOne(() => User, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  user: User | null

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
