const express = require("express");
const decodeJWT = require("../middleware/DecodeJWT");
const Task = require("../models/Task");
const router = express.Router();

router.post("/create/:projectId", decodeJWT, async (req, res) => {
    try {
        const { title, description, dueDate, status, _id } = req.body;
        const userId = req.id;
        const projectId = req.params.projectId;

        const task = await Task.findOne({ _id, userId, projectId });
        if (task) {
            await Task.findOneAndUpdate({ _id, userId, projectId }, { title, description, dueDate, status });
            return res.json({ success: true })
        }

        await Task.create({
            userId, projectId, title, dueDate, description, status
        })
        return res.json({ success: true });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Can not create project!" })
    }
})

router.post("/tasks/:projectId", decodeJWT, async (req, res) => {
    try {
        const userId = req.id;
        const projectId = req.params.projectId;
        const tasks = await Task.find({ userId, projectId });
        return res.json({ success: true, tasks })
    } catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Can not get tasks!" })
    }
})

router.delete("/delete/:_id/:projectId", decodeJWT, async (req, res) => {
    try {
        const { _id, projectId } = req.params;
        if (!_id || !projectId) return res.status(400).json({ success: false, message: "Invalid id!" });
        const userId = req.id;

        await Task.findByIdAndDelete({ _id, userId, projectId }, { new: true });
        return res.json({ success: true })
    } catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Can not delete task!" })
    }
})

module.exports = router;