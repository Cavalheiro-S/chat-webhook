/*
  Warnings:

  - You are about to drop the column `name` on the `friends` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userOneId,userTwoId]` on the table `friends` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `friends` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "friends" DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "friends_userOneId_userTwoId_key" ON "friends"("userOneId", "userTwoId");
