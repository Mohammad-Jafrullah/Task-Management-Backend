const express = require("express");
const decodeJWT = require("../middleware/DecodeJWT");
const Task = require("../models/Task");
const router = express.Router();

router.post("/tasks", decodeJWT, async (req, res) => {
    try {
        const userId = req.id;
        const tasks = await Task.find({ userId });
        return res.json({ success: true, tasks })
    } catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Can not get tasks!" })
    }
})

module.exports = router;F