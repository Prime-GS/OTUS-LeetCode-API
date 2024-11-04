import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { FileType } from '../enums'

@Entity({ name: 'files' })
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  type: FileType

  @Column()
  name: string

  @Column()
  path: string

  @Column()
  extension: string

  @Column()
  size: number

  @Column({ name: 'mime_type' })
  mimeType: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
