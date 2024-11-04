import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'first_name' })
  firstName: string

  @Column({ name: 'last_name', type: 'character varying', nullable: true })
  lastName: string | null

  @Column({ name: 'middle_name', type: 'character varying', nullable: true })
  middleName: string | null

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ type: 'text', array: true, nullable: true })
  roles: string[] | null

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
