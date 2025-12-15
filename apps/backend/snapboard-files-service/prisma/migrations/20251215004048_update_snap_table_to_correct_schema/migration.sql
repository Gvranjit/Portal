/*
  Warnings:

  - You are about to drop the column `authorId` on the `Snap` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Snap` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Snap` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `Snap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `Snap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimeType` to the `Snap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Snap` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Snap" DROP CONSTRAINT "Snap_authorId_fkey";

-- AlterTable
ALTER TABLE "Snap" DROP COLUMN "authorId",
DROP COLUMN "content",
DROP COLUMN "published",
ADD COLUMN     "createdById" INTEGER NOT NULL,
ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "mimeType" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL,
ALTER COLUMN "title" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Thumbnail" (
    "id" SERIAL NOT NULL,
    "snapId" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" TEXT NOT NULL,

    CONSTRAINT "Thumbnail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Thumbnail_snapId_key" ON "Thumbnail"("snapId");

-- AddForeignKey
ALTER TABLE "Snap" ADD CONSTRAINT "Snap_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thumbnail" ADD CONSTRAINT "Thumbnail_snapId_fkey" FOREIGN KEY ("snapId") REFERENCES "Snap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
