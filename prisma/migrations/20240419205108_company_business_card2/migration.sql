-- AlterTable
ALTER TABLE `Company` MODIFY `businessCardId` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `Company_businessCardId_idx` ON `Company`(`businessCardId`);
