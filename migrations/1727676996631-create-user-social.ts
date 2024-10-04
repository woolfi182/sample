import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserSocial1727676996631 implements MigrationInterface {
    name = 'CreateUserSocial1727676996631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user_socials" (
                "id" SERIAL NOT NULL,
                "type" character varying NOT NULL,
                "userId" uuid,
                CONSTRAINT "PK_b83c619b4b264f307240eb419ec" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "user_socials"
            ADD CONSTRAINT "FK_96bb948a91b6c8d4a8963743c1e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_socials" DROP CONSTRAINT "FK_96bb948a91b6c8d4a8963743c1e"
        `);
        await queryRunner.query(`
            DROP TABLE "user_socials"
        `);
    }

}
