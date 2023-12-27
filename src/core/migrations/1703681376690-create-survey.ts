import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSurvey1703681376690 implements MigrationInterface {
    name = 'CreateSurvey1703681376690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."survey_status_enum" AS ENUM('closed', 'opened')`);
        await queryRunner.query(`CREATE TABLE "survey" ("id" SERIAL NOT NULL, "question" character varying NOT NULL, "expires_at" TIMESTAMP, "status" "public"."survey_status_enum" NOT NULL DEFAULT 'opened', "votes" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_f0da32b9181e9c02ecf0be11ed3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "survey" ADD CONSTRAINT "FK_5963e1aea20c3c7c2108849c08a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" DROP CONSTRAINT "FK_5963e1aea20c3c7c2108849c08a"`);
        await queryRunner.query(`DROP TABLE "survey"`);
        await queryRunner.query(`DROP TYPE "public"."survey_status_enum"`);
    }

}
