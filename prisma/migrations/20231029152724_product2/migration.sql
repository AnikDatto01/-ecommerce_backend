-- CreateTable
CREATE TABLE `users` (
    `userID` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(255) NULL,
    `userPass` VARCHAR(200) NULL,
    `firstName` VARCHAR(255) NULL,
    `lastName` VARCHAR(50) NULL,
    `address` VARCHAR(255) NULL,
    `userEmail` VARCHAR(255) NULL,
    `userPhone` VARCHAR(255) NULL,
    `userType` INTEGER NULL,
    `create_date` INTEGER NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `userStatus` VARCHAR(191) NULL,
    `tokenCode` VARCHAR(100) NULL,
    `image` VARCHAR(191) NULL DEFAULT 'default.png',
    `creator` VARCHAR(250) NULL,
    `created` VARCHAR(250) NULL,
    `zone_divisions` VARCHAR(250) NULL,
    `zone_districts` VARCHAR(250) NULL,
    `zone_upazilas` VARCHAR(250) NULL,

    UNIQUE INDEX `users_userEmail_key`(`userEmail`),
    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `image` VARCHAR(191) NULL DEFAULT 'default.png',
    `create_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subcategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `image` VARCHAR(191) NULL DEFAULT 'default.png',
    `categoryId` INTEGER NOT NULL,
    `create_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Slider` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `text` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `image` VARCHAR(191) NULL DEFAULT 'default.png',
    `status` VARCHAR(191) NOT NULL,
    `create_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Brand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `image` VARCHAR(191) NULL DEFAULT 'default.png',
    `create_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Brand_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shop` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `image` VARCHAR(191) NULL DEFAULT 'default.png',
    `create_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Shop_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `regular_price` INTEGER NOT NULL,
    `sale_price` INTEGER NOT NULL,
    `coupon_discount` INTEGER NOT NULL,
    `coupon` VARCHAR(255) NOT NULL,
    `quntity` INTEGER NOT NULL,
    `active_status` VARCHAR(255) NOT NULL,
    `category` VARCHAR(255) NOT NULL,
    `subcategory` VARCHAR(255) NOT NULL,
    `brand` VARCHAR(255) NOT NULL,
    `shop` VARCHAR(255) NOT NULL,
    `new_arrival` VARCHAR(255) NOT NULL,
    `video` VARCHAR(600) NOT NULL,
    `selling_record` INTEGER NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `image` VARCHAR(191) NULL DEFAULT 'default.png',
    `create_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Subcategory` ADD CONSTRAINT `Subcategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
