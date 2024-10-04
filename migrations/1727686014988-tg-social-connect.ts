import { MigrationInterface, QueryRunner } from "typeorm";

export class TgSocialConnect1727686014988 implements MigrationInterface {
    name = 'TgSocialConnect1727686014988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tg_user_socials"
            ADD "senderId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tg_user_socials"
            ADD CONSTRAINT "UQ_7f8c15855102b95c58d801ab5bd" UNIQUE ("senderId")
        `);
        await queryRunner.query(`
            ALTER TABLE "tg_user_socials"
            ADD CONSTRAINT "FK_7f8c15855102b95c58d801ab5bd" FOREIGN KEY ("senderId") REFERENCES "tg_senders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tg_user_socials" DROP CONSTRAINT "FK_7f8c15855102b95c58d801ab5bd"
        `);
        await queryRunner.query(`
            ALTER TABLE "tg_user_socials" DROP CONSTRAINT "UQ_7f8c15855102b95c58d801ab5bd"
        `);
        await queryRunner.query(`
            ALTER TABLE "tg_user_socials" DROP COLUMN "senderId"
        `);
    }

}
