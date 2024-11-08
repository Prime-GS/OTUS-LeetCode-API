import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { Tag } from '../../tags/entities'
import { TaskDifficulty } from '../enum'

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column({ type: 'character varying' })
  difficulty: TaskDifficulty

  @Column()
  result: string

  @Column({ type: 'character varying', nullable: true })
  input: string | null

  @ManyToMany(() => Tag, { eager: true })
  @JoinTable({
    name: 'tasks_tags',
    joinColumn: {
      name: 'task_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags: Tag[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
