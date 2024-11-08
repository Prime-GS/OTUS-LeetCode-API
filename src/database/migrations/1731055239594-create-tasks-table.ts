import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTasksTable1731055239594 implements MigrationInterface {
    name = 'CreateTasksTable1731055239594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "difficulty" character varying NOT NULL, "result" character varying NOT NULL, "input" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks_tags" ("task_id" integer NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "PK_22555e9d5dfc37851895f0baffb" PRIMARY KEY ("task_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_59df4724a06cda41af87120b0a" ON "tasks_tags" ("task_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3d4e7b193cd9472ca9f5f6aa87" ON "tasks_tags" ("tag_id") `);
        await queryRunner.query(`ALTER TABLE "tasks_tags" ADD CONSTRAINT "FK_59df4724a06cda41af87120b0ab" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tasks_tags" ADD CONSTRAINT "FK_3d4e7b193cd9472ca9f5f6aa87f" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks_tags" DROP CONSTRAINT "FK_3d4e7b193cd9472ca9f5f6aa87f"`);
        await queryRunner.query(`ALTER TABLE "tasks_tags" DROP CONSTRAINT "FK_59df4724a06cda41af87120b0ab"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d4e7b193cd9472ca9f5f6aa87"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_59df4724a06cda41af87120b0a"`);
        await queryRunner.query(`DROP TABLE "tasks_tags"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
    }

}
