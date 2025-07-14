const Room = require('../models/Rooms');
const Question = require('../models/Questions');

const roomController = {
    createRoom: async (req, res) => {
        try {
            const { createdBy } = req.body;
            const code = Math.random().toString(36).substring(2, 8).toUpperCase();

            const room = await Room.create({
                roomCode: code,
                createdBy,
            });

            res.status(201).json(room);
        } catch (error) {
            console.error("Error creating room:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    getByRoomCode: async (req, res) => {
        try {
            const { code } = req.params;

            const room = await Room.findOne({ roomCode: code });
            if (!room) {
                return res.status(404).json({ message: "Room not found" });
            }

            res.json(room);
        } catch (error) {
            console.error("Error retrieving room:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    createQuestion: async (req, res) => {
        try {
            const { content, createdBy } = req.body;
            const { code } = req.params;

            const question = await Question.create({
                roomCode: code,
                content,
                createdBy
            });

            res.status(201).json(question);
        } catch (error) {
            console.error("Error creating question:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    getQuestions: async (req, res) => {
        try {
            const { code } = req.params;

            const questions = await Question.find({ roomCode: code }).sort({ createdAt: -1 });

            res.status(200).json(questions);
        } catch (error) {
            console.error("Error retrieving questions:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    deleteRoom: async(req, res) =>{
        try{
            const { code } = req.params;

            const room = await Room.findOneAndDelete({ roomCode: code });
            if (!room) {
                return res.status(404).json({ message: "Room not found" });
            }

            res.status(204).send();
        }catch(error){
            console.error("Error deleting room:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    deleteQuestion: async(req, res) =>{
        try{
            const { questionId } = req.params;

            const question = await Question.findByIdAndDelete(questionId);
            if (!question) {
                return res.status(404).json({ message: "Question not found" });
            }

            res.status(204).send();
        }catch(error){
            console.error("Error deleting question:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

};

module.exports = roomController;
