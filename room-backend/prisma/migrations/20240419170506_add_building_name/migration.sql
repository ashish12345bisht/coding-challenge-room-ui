/*
  Warnings:

  - Added the required column `name` to the `Building` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Building" ADD COLUMN     "name" TEXT NOT NULL;
