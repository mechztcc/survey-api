import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserVote1703683722733 implements MigrationInterface {
    name = 'CreateUserVote1703683722733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_vote_vote_enum" AS ENUM('yes', 'no')`);
        await queryRunner.query(`CREATE TABLE "user_vote" ("id" SERIAL NOT NULL, "vote" "public"."user_vote_vote_enum" NOT NULL DEFAULT 'no', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "surveyId" integer, CONSTRAINT "PK_0594b265cd5d22c938feecb4ea7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_vote" ADD CONSTRAINT "FK_4678b853c694dd95659e73d372d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_vote" ADD CONSTRAINT "FK_b874119308303812b772ec41a4e" FOREIGN KEY ("surveyId") REFERENCES "survey"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_vote" DROP CONSTRAINT "FK_b874119308303812b772ec41a4e"`);
        await queryRunner.query(`ALTER TABLE "user_vote" DROP CONSTRAINT "FK_4678b853c694dd95659e73d372d"`);
        await queryRunner.query(`DROP TABLE "user_vote"`);
        await queryRunner.query(`DROP TYPE "public"."user_vote_vote_enum"`);
    }

}
