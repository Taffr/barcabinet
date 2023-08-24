/*
  Warnings:

  - The primary key for the `Dosage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `name` on the `Ingredient` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `name` on the `Recipe` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to drop the `Favourite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SavedIngredient` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `preparation` on table `Recipe` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Dosage` DROP FOREIGN KEY `Dosage_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Dosage` DROP FOREIGN KEY `Dosage_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Favourite` DROP FOREIGN KEY `Favourite_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Favourite` DROP FOREIGN KEY `Favourite_ibfk_2`;

-- DropForeignKey
ALTER TABLE `SavedIngredient` DROP FOREIGN KEY `SavedIngredient_ibfk_1`;

-- DropForeignKey
ALTER TABLE `SavedIngredient` DROP FOREIGN KEY `SavedIngredient_ibfk_2`;

-- AlterTable
ALTER TABLE `Dosage` DROP PRIMARY KEY,
    MODIFY `amount` DOUBLE NULL,
    MODIFY `unit` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`ingredientId`, `recipeId`);

-- AlterTable
ALTER TABLE `Ingredient` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Recipe` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `garnish` VARCHAR(191) NULL,
    MODIFY `preparation` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `hash` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Favourite`;

-- DropTable
DROP TABLE `SavedIngredient`;

-- CreateTable
CREATE TABLE `_IngredientToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_IngredientToUser_AB_unique`(`A`, `B`),
    INDEX `_IngredientToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RecipeToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RecipeToUser_AB_unique`(`A`, `B`),
    INDEX `_RecipeToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_name_key` ON `User`(`name`);

-- AddForeignKey
ALTER TABLE `Dosage` ADD CONSTRAINT `Dosage_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dosage` ADD CONSTRAINT `Dosage_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `Ingredient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_IngredientToUser` ADD CONSTRAINT `_IngredientToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Ingredient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_IngredientToUser` ADD CONSTRAINT `_IngredientToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RecipeToUser` ADD CONSTRAINT `_RecipeToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RecipeToUser` ADD CONSTRAINT `_RecipeToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `Ingredient` RENAME INDEX `name` TO `Ingredient_name_key`;

-- RenameIndex
ALTER TABLE `Recipe` RENAME INDEX `name` TO `Recipe_name_key`;
