/*
  Warnings:

  - You are about to drop the column `userId` on the `Calendar` table. All the data in the column will be lost.
  - Added the required column `courseEnd` to the `Calendar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseStart` to the `Calendar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerId` to the `Calendar` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Calendar" DROP CONSTRAINT "Calendar_userId_fkey";

-- AlterTable
ALTER TABLE "Calendar" DROP COLUMN "userId",
ADD COLUMN     "courseEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "courseStart" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "playerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Calendar" ADD CONSTRAINT "Calendar_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
