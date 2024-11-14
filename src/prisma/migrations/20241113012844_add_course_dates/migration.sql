/*
  Warnings:

  - You are about to drop the column `courseEnd` on the `Calendar` table. All the data in the column will be lost.
  - You are about to drop the column `courseStart` on the `Calendar` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `Calendar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Calendar" DROP COLUMN "courseEnd",
DROP COLUMN "courseStart",
ADD COLUMN     "courseId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "courseStart" TIMESTAMP(3) NOT NULL,
    "courseEnd" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_code_key" ON "Course"("code");

-- AddForeignKey
ALTER TABLE "Calendar" ADD CONSTRAINT "Calendar_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;