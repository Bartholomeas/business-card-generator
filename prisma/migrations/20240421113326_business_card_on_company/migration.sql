/*
  Warnings:

  - You are about to drop the column `userId` on the `BusinessCard` table. All the data in the column will be lost.
  - You are about to drop the column `businessCardId` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyId]` on the table `BusinessCard` will be added. If there are existing duplicate values, this will fail.
  - Made the column `updatedAt` on table `BusinessCard` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `BusinessCard_userId_idx` ON `BusinessCard`;

-- DropIndex
DROP INDEX `BusinessCard_userId_key` ON `BusinessCard`;

-- DropIndex
DROP INDEX `Company_businessCardId_idx` ON `Company`;

-- DropIndex
DROP INDEX `Company_businessCardId_key` ON `Company`;

-- DropIndex
DROP INDEX `Company_userId_idx` ON `Company`;

-- DropIndex
DROP INDEX `Company_userId_key` ON `Company`;

-- AlterTable
ALTER TABLE `BusinessCard` DROP COLUMN `userId`,
    ADD COLUMN `companyId` VARCHAR(191) NULL,
    MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Company` DROP COLUMN `businessCardId`,
    DROP COLUMN `userId`,
    MODIFY `isPublished` BOOLEAN NULL DEFAULT true;

-- CreateTable
CREATE TABLE `UserDetailsOnCompany` (
    `id` VARCHAR(191) NOT NULL,
    `userDetailsId` VARCHAR(191) NOT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UserDetailsOnCompany_userDetailsId_key`(`userDetailsId`),
    UNIQUE INDEX `UserDetailsOnCompany_companyId_key`(`companyId`),
    INDEX `UserDetailsOnCompany_userDetailsId_companyId_idx`(`userDetailsId`, `companyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserDetailsOnBusinessCard` (
    `id` VARCHAR(191) NOT NULL,
    `userDetailsId` VARCHAR(191) NOT NULL,
    `businessCardId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UserDetailsOnBusinessCard_userDetailsId_key`(`userDetailsId`),
    UNIQUE INDEX `UserDetailsOnBusinessCard_businessCardId_key`(`businessCardId`),
    INDEX `UserDetailsOnBusinessCard_userDetailsId_businessCardId_idx`(`userDetailsId`, `businessCardId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `BusinessCard_companyId_key` ON `BusinessCard`(`companyId`);

-- CreateIndex
CREATE INDEX `BusinessCard_companyId_idx` ON `BusinessCard`(`companyId`);
