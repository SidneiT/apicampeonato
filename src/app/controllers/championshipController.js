const express = require('express');
const router = express.Router();
const api = require('../api/championshipApi');

router.get('/', async (req, res) => {
    try {
        api.list(req, res);
    } catch (error) {
        return res.status(400).send({ error: 'Failed to load data' })
    }
});

module.exports = app => app.use('/championship', router);