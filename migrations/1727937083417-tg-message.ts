import { MigrationInterface, QueryRunner } from "typeorm";

export class TgMessage1727937083417 implements MigrationInterface {
    name = 'TgMessage1727937083417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "tg_messages" (
                "id" SERIAL NOT NULL,
                "tgId" character varying NOT NULL,
                "message" text NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
                "senderId" integer,
                "groupId" integer,
                CONSTRAINT "PK_328dacf9f7956030249e97a8f73" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "tg_messages"
            ADD CONSTRAINT "FK_581adb44846b4468f0a8b97b973" FOREIGN KEY ("senderId") REFERENCES "tg_senders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tg_messages"
            ADD CONSTRAINT "FK_15c5d2206465a5fd09d6b7661f8" FOREIGN KEY ("groupId") REFERENCES "tg_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tg_messages" DROP CONSTRAINT "FK_15c5d2206465a5fd09d6b7661f8"
        `);
        await queryRunner.query(`
            ALTER TABLE "tg_messages" DROP CONSTRAINT "FK_581adb44846b4468f0a8b97b973"
        `);
        await queryRunner.query(`
            DROP TABLE "tg_messages"
        `);
    }

}
