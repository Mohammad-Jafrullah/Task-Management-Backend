const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String
    },
    publishedDate: {
        type: String,
        default: new Date().toLocaleDateString('en-IN', {
            timeZone: 'Asia/Kolkata',
        })
    }
})

module.exports = mongoose.model('Project', ProjectSchema, 'Project');