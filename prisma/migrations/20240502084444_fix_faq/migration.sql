/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Company` MODIFY `slug` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `FaqQuestion` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` MEDIUMTEXT NOT NULL,
    `faqSectionId` VARCHAR(191) NULL,

    INDEX `FaqQuestion_faqSectionId_idx`(`faqSectionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FaqSection` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NULL,
    `companyPageSectionId` VARCHAR(191) NULL,

    UNIQUE INDEX `FaqSection_companyPageSectionId_key`(`companyPageSectionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Opinion` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `userDetailsId` VARCHAR(191) NOT NULL,
    `opinionsSectionId` VARCHAR(191) NULL,

    UNIQUE INDEX `Opinion_userDetailsId_key`(`userDetailsId`),
    UNIQUE INDEX `Opinion_opinionsSectionId_key`(`opinionsSectionId`),
    INDEX `Opinion_opinionsSectionId_idx`(`opinionsSectionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OpinionsSection` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NULL,
    `companyPageSectionId` VARCHAR(191) NULL,

    UNIQUE INDEX `OpinionsSection_companyPageSectionId_key`(`companyPageSectionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `userDetailsId` VARCHAR(191) NOT NULL,
    `commentsSectionId` VARCHAR(191) NULL,

    INDEX `Comment_commentsSectionId_idx`(`commentsSectionId`),
    INDEX `Comment_userDetailsId_idx`(`userDetailsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommentsSection` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NULL,
    `companyPageSectionId` VARCHAR(191) NULL,

    UNIQUE INDEX `CommentsSection_companyPageSectionId_key`(`companyPageSectionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompanyPageSection` (
    `id` VARCHAR(191) NOT NULL,
    `sectionType` ENUM('faqSection', 'opinionsSection', 'commentsSection') NOT NULL,
    `companyPageId` VARCHAR(191) NOT NULL,

    INDEX `CompanyPageSection_companyPageId_idx`(`companyPageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompanyPage` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `CompanyPage_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Company_slug_key` ON `Company`(`slug`);
