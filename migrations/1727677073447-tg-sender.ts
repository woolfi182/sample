import { MigrationInterface, QueryRunner } from "typeorm";

export class TgSender1727677073447 implements MigrationInterface {
    name = 'TgSender1727677073447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "tg_senders" (
                "id" SERIAL NOT NULL,
                "username" character varying NOT NULL DEFAULT '',
                "firstName" character varying NOT NULL DEFAULT '',
                "lastName" character varying NOT NULL DEFAULT '',
                "tgId" character varying NOT NULL,
                "langCode" character varying NOT NULL,
                "isBot" boolean NOT NULL,
                "isDeleted" boolean NOT NULL,
                "isPremium" boolean NOT NULL,
                "isBotBusiness" boolean NOT NULL,
                "isRestricted" boolean NOT NULL,
                "isScam" boolean NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
                "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
                CONSTRAINT "UQ_d613ea8a833ab18fefdd36e65f6" UNIQUE ("tgId"),
                CONSTRAINT "PK_bc0915095655dad91fd8ab6d39c" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "tg_senders"
        `);
    }

}
