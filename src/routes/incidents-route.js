const express = require('express');
const router = express.Router();
const controller = require('../controllers/incidents-controller');
const authService = require('../services/auth-service');

router.post('/novo', authService.authorize, controller.post);
router.get('/selectIncidents/:ong', authService.authorize, controller.getByOng);
router.delete('/deletIncident/:id', authService.authorize, controller.delete);


module.exports = router;