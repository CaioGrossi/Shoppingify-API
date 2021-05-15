import {MigrationInterface, QueryRunner} from "typeorm";

export class init1621040307101 implements MigrationInterface {
    name = 'init1621040307101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "top_user_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "used_times" integer NOT NULL, "ownerId" uuid, CONSTRAINT "PK_fb4f33916b7812f790432c31f23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "top_user_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "used_times" integer NOT NULL, "ownerId" uuid, CONSTRAINT "PK_f2361ecf243d8c2a7dd1f6d8857" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(200) NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "password" character varying NOT NULL, "items_quantity" integer NOT NULL DEFAULT '0', "category_quantity" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shopping_list" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_At" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL DEFAULT 'open', "ownerId" uuid, CONSTRAINT "PK_87d9431f2ea573a79370742b474" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shopping_list_item" ("quantity" integer NOT NULL, "checked" boolean NOT NULL, "item_id" uuid NOT NULL, "shopping_list_id" uuid NOT NULL, CONSTRAINT "PK_79cbe1c9c266feef804ccf3106c" PRIMARY KEY ("item_id", "shopping_list_id"))`);
        await queryRunner.query(`CREATE TABLE "item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "categoryId" uuid, CONSTRAINT "UQ_c6ae12601fed4e2ee5019544ddf" UNIQUE ("name"), CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "top_user_categories" ADD CONSTRAINT "FK_5c45f7e8072ab200d0ab549a093" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "top_user_items" ADD CONSTRAINT "FK_fd6d201fb0690294656dfe48094" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopping_list" ADD CONSTRAINT "FK_1698c99cd84960bc4b06b0e30c0" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopping_list_item" ADD CONSTRAINT "FK_365efbea1f22c88ae93c69b2880" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopping_list_item" ADD CONSTRAINT "FK_38e3183f63188df73e3a8def061" FOREIGN KEY ("shopping_list_id") REFERENCES "shopping_list"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_c0c8f47a702c974a77812169bc2" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_c0c8f47a702c974a77812169bc2"`);
        await queryRunner.query(`ALTER TABLE "shopping_list_item" DROP CONSTRAINT "FK_38e3183f63188df73e3a8def061"`);
        await queryRunner.query(`ALTER TABLE "shopping_list_item" DROP CONSTRAINT "FK_365efbea1f22c88ae93c69b2880"`);
        await queryRunner.query(`ALTER TABLE "shopping_list" DROP CONSTRAINT "FK_1698c99cd84960bc4b06b0e30c0"`);
        await queryRunner.query(`ALTER TABLE "top_user_items" DROP CONSTRAINT "FK_fd6d201fb0690294656dfe48094"`);
        await queryRunner.query(`ALTER TABLE "top_user_categories" DROP CONSTRAINT "FK_5c45f7e8072ab200d0ab549a093"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`DROP TABLE "shopping_list_item"`);
        await queryRunner.query(`DROP TABLE "shopping_list"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "top_user_items"`);
        await queryRunner.query(`DROP TABLE "top_user_categories"`);
    }

}
