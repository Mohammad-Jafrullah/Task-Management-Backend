const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    title: {
        type: String
    },
    description: {
        Type: String
    },
    status: {
        type: String
    },
    dueDate: {
        type: String,
        default: new Date().toLocaleDateString('en-IN', {
            timeZone: 'Asia/Kolkata',
        })
    }
})

module.exports = mongoose.model('Task', TaskSchema, 'Task');