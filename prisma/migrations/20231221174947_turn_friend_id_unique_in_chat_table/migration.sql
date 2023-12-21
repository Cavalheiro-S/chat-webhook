/*
  Warnings:

  - A unique constraint covering the columns `[friendId]` on the table `chats` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "chats_friendId_key" ON "chats"("friendId");
