/*
  Warnings:

  - You are about to drop the column `description` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[businessCardId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `businessCardId` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Company` DROP COLUMN `description`,
    ADD COLUMN `businessCardId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Company_businessCardId_key` ON `Company`(`businessCardId`);
