import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedProfileUser1703777586975 implements MigrationInterface {
    name = 'AddedProfileUser1703777586975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_profile_enum" AS ENUM('admin', 'guest')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "profile" "public"."user_profile_enum" NOT NULL DEFAULT 'admin'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profile"`);
        await queryRunner.query(`DROP TYPE "public"."user_profile_enum"`);
    }

}
