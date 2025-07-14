const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// Create a new room
router.post('/', roomController.createRoom);

// Get a room by code
router.get('/:code', roomController.getByRoomCode);

// Add a question to a room
router.post('/:code/question', roomController.createQuestion); // CHANGED to POST

// Get all questions for a room
router.get('/:code/questions', roomController.getQuestions);

module.exports = router;
