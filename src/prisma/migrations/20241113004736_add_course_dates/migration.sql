/*
  Warnings:

  - You are about to drop the column `playerId` on the `Calendar` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Calendar` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Calendar" DROP CONSTRAINT "Calendar_playerId_fkey";

-- AlterTable
ALTER TABLE "Calendar" DROP COLUMN "playerId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Calendar" ADD CONSTRAINT "Calendar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
