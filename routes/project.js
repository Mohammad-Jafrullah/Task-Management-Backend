const express = require("express");
const decodeJWT = require("../middleware/DecodeJWT");
const Project = require("../models/Project");
const Task = require("../models/Task");
const router = express.Router();

router.post("/create", decodeJWT, async (req, res) => {
    try {
        const { title, description, status, projectId } = req.body;
        const userId = req.id;
        const _id = projectId;

        if (status === "completed") {
            const hasPendingTask = await Task.exists({
                projectId,
                userId,
                status: { $ne: "done" }
            });

            if (hasPendingTask) {
                return res.status(400).json({
                    success: false,
                    message: "All tasks must be 'done' before completing the project."
                });
            }
        }

        const project = await Project.findOne({ _id, userId });
        if (project) {
            await Project.findOneAndUpdate({ _id, userId }, { title, description, status });
            return res.json({ success: true })
        }

        await Project.create({
            userId, title, description, status
        })
        return res.json({ success: true })
    } catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Can not create project!" })
    }
})

router.delete("/delete/:_id", decodeJWT, async (req, res) => {
    try {
        const _id = req.params._id;
        if (!_id) return res.status(400).json({ success: false, message: "Invalid id!" });
        const userId = req.id;

        await Project.findByIdAndDelete({ _id, userId }, { new: true });
        return res.json({ success: true })
    } catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Can not delete project!" })
    }
})

router.post("/projects", decodeJWT, async (req, res) => {
    try {
        const userId = req.id;
        const projects = await Project.find({ userId });
        return res.json({ success: true, projects })
    } catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Can not get projects!" })
    }
})

router.post("/:projectId", decodeJWT, async (req, res) => {
    try {
        const userId = req.id;
        const _id = req.params.projectId;
        const project = await Project.findOne({ _id, userId });
        return res.json({ success: true, project })
    } catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Can not get project!" })
    }
})

module.exports = router;