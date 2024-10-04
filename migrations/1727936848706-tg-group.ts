import { MigrationInterface, QueryRunner } from "typeorm";

export class TgGroup1727936848706 implements MigrationInterface {
    name = 'TgGroup1727936848706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "tg_groups" (
                "id" SERIAL NOT NULL,
                "tgId" character varying NOT NULL,
                "title" text NOT NULL,
                "username" character varying,
                "isForum" boolean NOT NULL,
                "isGigagroup" boolean NOT NULL,
                "isMegagroup" boolean NOT NULL,
                CONSTRAINT "UQ_b974a88e0808078e1817660a086" UNIQUE ("tgId"),
                CONSTRAINT "PK_84d8953a576f5c8d34cfc09689f" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "tg_groups"
        `);
    }

}
