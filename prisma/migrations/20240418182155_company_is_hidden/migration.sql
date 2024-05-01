-- AlterTable
ALTER TABLE `Company` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `isPublished` BOOLEAN NULL DEFAULT false;
