/*
  Warnings:

  - You are about to drop the column `chatId` on the `users` table. All the data in the column will be lost.
  - Added the required column `friendId` to the `chats` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_chatId_fkey";

-- AlterTable
ALTER TABLE "chats" ADD COLUMN     "friendId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "chatId";

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "friends"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
