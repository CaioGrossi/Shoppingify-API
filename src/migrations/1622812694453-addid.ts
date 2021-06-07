import {MigrationInterface, QueryRunner} from "typeorm";

export class addid1622812694453 implements MigrationInterface {
    name = 'addid1622812694453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping_list_item" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "shopping_list_item" DROP CONSTRAINT "PK_79cbe1c9c266feef804ccf3106c"`);
        await queryRunner.query(`ALTER TABLE "shopping_list_item" ADD CONSTRAINT "PK_a03ace0ae5e6d61177292e5bf3d" PRIMARY KEY ("item_id", "shopping_list_id", "id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping_list_item" DROP CONSTRAINT "PK_a03ace0ae5e6d61177292e5bf3d"`);
        await queryRunner.query(`ALTER TABLE "shopping_list_item" ADD CONSTRAINT "PK_79cbe1c9c266feef804ccf3106c" PRIMARY KEY ("item_id", "shopping_list_id")`);
        await queryRunner.query(`ALTER TABLE "shopping_list_item" DROP COLUMN "id"`);
    }

}
