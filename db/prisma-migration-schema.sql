-- CreateTable
CREATE TABLE `Dosage` (
    `recipeId` INTEGER NOT NULL,
    `ingredientId` INTEGER NOT NULL,
    `amount` FLOAT NULL,
    `unit` TEXT NULL,

    INDEX `ingredientId`(`ingredientId`),
    PRIMARY KEY (`recipeId`, `ingredientId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favourite` (
    `userId` INTEGER NOT NULL,
    `recipeId` INTEGER NOT NULL,

    INDEX `recipeId`(`recipeId`),
    PRIMARY KEY (`userId`, `recipeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ingredient` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recipe` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `garnish` TEXT NULL,
    `preparation` TEXT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SavedIngredient` (
    `userId` INTEGER NOT NULL,
    `ingredientId` INTEGER NOT NULL,

    INDEX `ingredientId`(`ingredientId`),
    PRIMARY KEY (`userId`, `ingredientId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `hash` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Dosage` ADD CONSTRAINT `Dosage_ibfk_1` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Dosage` ADD CONSTRAINT `Dosage_ibfk_2` FOREIGN KEY (`ingredientId`) REFERENCES `Ingredient`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Favourite` ADD CONSTRAINT `Favourite_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Favourite` ADD CONSTRAINT `Favourite_ibfk_2` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `SavedIngredient` ADD CONSTRAINT `SavedIngredient_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `SavedIngredient` ADD CONSTRAINT `SavedIngredient_ibfk_2` FOREIGN KEY (`ingredientId`) REFERENCES `Ingredient`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
