import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTgUserSocial1727683370413 implements MigrationInterface {
    name = 'CreateTgUserSocial1727683370413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "tg_user_socials" (
                "id" SERIAL NOT NULL,
                "userId" uuid,
                CONSTRAINT "REL_6c682679ae2989b37d44fd46f1" UNIQUE ("userId"),
                CONSTRAINT "PK_f350d0f74f50b7006397254ceee" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "tg_user_socials"
            ADD CONSTRAINT "FK_6c682679ae2989b37d44fd46f11" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tg_user_socials" DROP CONSTRAINT "FK_6c682679ae2989b37d44fd46f11"
        `);
        await queryRunner.query(`
            DROP TABLE "tg_user_socials"
        `);
    }

}
