-- CreateTable
CREATE TABLE "Building" (
    "id" SERIAL NOT NULL,
    "temperature" INTEGER NOT NULL DEFAULT 20,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "occupant_name" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "heating_status" BOOLEAN NOT NULL,
    "cooling_status" BOOLEAN NOT NULL,
    "buildingId" INTEGER NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
