import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSurvey1703678613406 implements MigrationInterface {
    name = 'CreateSurvey1703678613406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "survey" ("id" SERIAL NOT NULL, "question" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_f0da32b9181e9c02ecf0be11ed3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "survey" ADD CONSTRAINT "FK_5963e1aea20c3c7c2108849c08a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" DROP CONSTRAINT "FK_5963e1aea20c3c7c2108849c08a"`);
        await queryRunner.query(`DROP TABLE "survey"`);
    }

}
