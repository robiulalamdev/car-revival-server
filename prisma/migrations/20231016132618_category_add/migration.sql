/*
  Warnings:

  - You are about to drop the column `title` on the `category` table. All the data in the column will be lost.
  - Added the required column `details` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faq` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "address_userId_key";

-- AlterTable
ALTER TABLE "category" DROP COLUMN "title",
ADD COLUMN     "details" TEXT NOT NULL,
ADD COLUMN     "faq" JSONB NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "sub_categories" TEXT[];
