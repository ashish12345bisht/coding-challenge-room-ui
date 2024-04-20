const express = require('express');
const roomRouter = express.Router();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Create a new room
roomRouter.post('/', async (req, res) => {
    try {
        const { occupant_name, temperature, buildingId } = req.body;
        const building = await prisma.building.findFirst({ where: { id: parseInt(buildingId) } });
        const room = await prisma.room.create({
            data: {
                occupant_name,
                temperature,
                heating_status: temperature < building?.temperature ? true : false,
                cooling_status: temperature > building?.temperature ? true : false,
                buildingId: parseInt(buildingId),
            },
        });
        res.json(room);
    } catch (error) {
        console.error('Error creating room:', error);
        res.status(500).json({ error: 'Error creating room' });
    }
});

// Retrieve all rooms
roomRouter.get('/', async (req, res) => {
    try {
        const { buildingId } = req.query;
        let rooms;
        if (buildingId) {
            rooms = await prisma.room.findMany({
                where: {
                    buildingId: parseInt(buildingId)
                }
            });
        } else {
            rooms = await prisma.room.findMany();
        }
        res.json(rooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ error: 'Error fetching rooms' });
    }
});

// Retrieve a single room by ID
roomRouter.get('/:id', async (req, res) => {
    try {
        const room = await prisma.room.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json(room);
    } catch (error) {
        console.error('Error fetching room:', error);
        res.status(500).json({ error: 'Error fetching room' });
    }
});

// Update a room by ID
roomRouter.put('/:id', async (req, res) => {
    try {
        const { occupant_name, temperature, buildingId } = req.body;
        const building = await prisma.building.findFirst({ where: { id: parseInt(buildingId) } });
        const updatedRoom = await prisma.room.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: {
                occupant_name,
                temperature,
                heating_status: temperature < building?.temperature ? true : false,
                cooling_status: temperature > building?.temperature ? true : false,
                buildingId: parseInt(buildingId),
            },
        });
        res.json(updatedRoom);
    } catch (error) {
        console.error('Error updating room:', error);
        res.status(500).json({ error: 'Error updating room' });
    }
});

// Delete a room by ID
roomRouter.delete('/:id', async (req, res) => {
    try {
        await prisma.room.delete({
            where: {
                id: parseInt(req.params.id),
            },
        });
        res.json({ message: 'Room deleted successfully' });
    } catch (error) {
        console.error('Error deleting room:', error);
        res.status(500).json({ error: 'Error deleting room' });
    }
});

module.exports = roomRouter;