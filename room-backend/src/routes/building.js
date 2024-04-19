const express = require('express');
const buildingRouter = express.Router();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Create a new building
buildingRouter.post('/', async (req, res) => {
    try {
        const { name, temperature } = req.body;
        const building = await prisma.building.create({
            data: {
                name,
                temperature,
            },
        });
        res.json(building);
    } catch (error) {
        console.error('Error creating building:', error);
        res.status(500).json({ error: 'Error creating building' });
    }
});

// Retrieve all buildings
buildingRouter.get('/', async (req, res) => {
    try {
        const buildings = await prisma.building.findMany();
        res.json(buildings);
    } catch (error) {
        console.error('Error fetching buildings:', error);
        res.status(500).json({ error: 'Error fetching buildings' });
    }
});

// Retrieve a single building by ID
buildingRouter.get('/:id', async (req, res) => {
    try {
        const building = await prisma.building.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });
        if (!building) {
            return res.status(404).json({ error: 'Building not found' });
        }
        res.json(building);
    } catch (error) {
        console.error('Error fetching building:', error);
        res.status(500).json({ error: 'Error fetching building' });
    }
});

// Update a building by ID
buildingRouter.put('/:id', async (req, res) => {
    try {
        const { name, temperature } = req.body;
        const updatedBuilding = await prisma.building.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: {
                name,
                temperature,
            },
        });
        res.json(updatedBuilding);
    } catch (error) {
        console.error('Error updating building:', error);
        res.status(500).json({ error: 'Error updating building' });
    }
});

// Delete a building by ID
buildingRouter.delete('/:id', async (req, res) => {
    try {
        await prisma.building.delete({
            where: {
                id: parseInt(req.params.id),
            },
        });
        res.json({ message: 'Building deleted successfully' });
    } catch (error) {
        console.error('Error deleting building:', error);
        res.status(500).json({ error: 'Error deleting building' });
    }
});

module.exports = buildingRouter;