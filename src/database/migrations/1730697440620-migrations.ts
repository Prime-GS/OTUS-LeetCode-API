import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migrations1730697440620 implements MigrationInterface {
  name = 'Migrations1730697440620'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying, "middle_name" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "roles" text array, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "files" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "name" character varying NOT NULL, "path" character varying NOT NULL, "extension" character varying NOT NULL, "size" integer NOT NULL, "mime_type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "sessions" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "session_token" character varying NOT NULL, "is_active" boolean NOT NULL, "last_login_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19"`)
    await queryRunner.query(`DROP TABLE "sessions"`)
    await queryRunner.query(`DROP TABLE "files"`)
    await queryRunner.query(`DROP TABLE "users"`)
  }
}
