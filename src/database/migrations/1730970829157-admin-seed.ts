import { MigrationInterface, QueryRunner } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from '../../modules/users/entities'

export class AdminSeed1730970829157 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin', 10)

    const admin = queryRunner.manager.create(User, {
      firstName: 'Admin',
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      roles: ['admin'],
    })

    await queryRunner.manager.save(admin)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(User, { email: process.env.ADMIN_EMAIL })
  }
}
