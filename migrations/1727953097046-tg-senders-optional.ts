import { MigrationInterface, QueryRunner } from "typeorm";

export class TgSendersOptional1727953097046 implements MigrationInterface {
    name = 'TgSendersOptional1727953097046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tg_senders"
            ALTER COLUMN "username" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tg_senders"
            ALTER COLUMN "username" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "tg_senders"
            ALTER COLUMN "firstName" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tg_senders"
            ALTER COLUMN "firstName" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "tg_senders"
            ALTER COLUMN "lastName" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tg_senders"
            ALTER COLUMN "lastName" DROP DEFAULT
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tg_senders"
            ALTER COLUMN "lastName"
            SET DEFAULT ''
        `);
        await queryRunner.query(`
            ALTER TABLE "tg_senders"
            ALTER COLUMN "lastName"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tg_senders"
            ALTER COLUMN "firstName"
            SET DEFAULT ''
        `);
        await queryRunner.query(`
            ALTER TABLE "tg_senders"
            ALTER COLUMN "firstName"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tg_senders"
            ALTER COLUMN "username"
            SET DEFAULT ''
        `);
        await queryRunner.query(`
            ALTER TABLE "tg_senders"
            ALTER COLUMN "username"
            SET NOT NULL
        `);
    }

}
