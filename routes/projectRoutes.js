// NODE MODULES
const express = require('express');
const projectDb = require('../data/helpers/projectModel.js');

// EXPRESS ROUTER
const router = express.Router();

// ROUTES
router.get('/', async (_, res) => {
    try {
        const projects = await projectDb.get();
        res.status(200).json({ projects });
    } catch (err) {
        res.status(500).json({ error: 'The projects could not be retrieved from the database.' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const project = await projectDb.get(req.params.id);
        project
            ? res.status(200).json({ project })
            : res.status(404).json({ message: 'The project with the specified ID does not exist.' });
    } catch (err) {
        res.status(500).json({ error: 'The project could not be retrieved from the database.' });
    }
});

router.post('/', async (req, res) => {
    if (req.body.name && req.body.description) {
        try {
            const addedProject = await projectDb.insert(req.body);
            const project = await projectDb.get(addedProject.id);
            res.status(201).json({ project });
        } catch (err) {
            res
                .status(500)
                .json({ error: 'There was an error while saving the project to the database.' });
    }
    } else {
        res
            .status(400)
            .json({ errorMessage: 'Please provide a name and description for the project.' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const count = await projectDb.remove(req.params.id);
            count
            ? res.status(200).json({ message: 'Successfully deleted project.' })
            : res.status(404).json({ message: 'The project with the specified ID does not exist.' });
    } catch (err) {
        res.status(500).json({ error: 'There was a database error deleting the project.' });
    }
});

    router.put('/:id', async (req, res) => {
        if (req.body.name && req.body.description) {
            try {
            const newProject = await projectDb.update(req.params.id, req.body);
        if (newProject) {
            const project = await projectDb.get(req.params.id);
            res.status(200).json({ project });
        } else {
            res.status(404).json({ message: 'The project with the specified ID does not exist.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'The specified project could not be modified.' });
    }
    } else {
        res
            .status(400)
            .json({ errorMessage: 'Please provide a name and description for the project.' });
    }
});

module.exports = router;