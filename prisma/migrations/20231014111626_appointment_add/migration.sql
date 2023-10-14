/*
  Warnings:

  - You are about to drop the column `orderedServices` on the `order` table. All the data in the column will be lost.
  - Added the required column `serviceId` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeSlotId` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "orderedServices",
ADD COLUMN     "serviceId" INTEGER NOT NULL,
ADD COLUMN     "timeSlotId" INTEGER NOT NULL,
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'customer';

-- CreateTable
CREATE TABLE "appointment" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointment_pkey" PRIMARY KEY ("id")
);
