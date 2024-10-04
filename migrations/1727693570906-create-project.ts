import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProject1727693570906 implements MigrationInterface {
  name = 'CreateProject1727693570906';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."projects_status_enum" AS ENUM('active', 'inactive', 'deleted')
        `);
    await queryRunner.query(`
            CREATE TABLE "projects" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "status" "public"."projects_status_enum" NOT NULL DEFAULT 'active',
                "leadRequirements" text NOT NULL,
                "groups" text array NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
                "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
                "userId" uuid,
                CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "projects"
            ADD CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "projects" DROP CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f"
        `);
    await queryRunner.query(`
            DROP TABLE "projects"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."projects_status_enum"
        `);
  }
}
