const seedData = require("./seedData");
const db = require('./db');
const User = require("./models/User");
const Project = require("./models/Project");
const Task = require("./models/Task");
const bcrypt = require('bcrypt');

db();

async function createSeed() {
    const { user, projects } = seedData;
    const { name, email, password } = user;

    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const isUser = await User.findOne({ email });
        if (isUser) {
            console.log("Seed Already Created.");
            process.exit(0);
        }
        const createUser = await User.create({
            name, email, password: hashedPassword
        });
        const userId = createUser._id;

        await Promise.all(projects.map(async project => {
            const { title, description, status, tasks } = project;

            const createProject = await Project.create({
                userId, title, description, status
            });

            const projectId = createProject._id;

            // Wait for all tasks to be created for this project
            await Promise.all(tasks.map(async task => {
                const { title, description, status, dueDate } = task;
                await Task.create({
                    userId, projectId, title, description, status, dueDate
                });
            }));
        }));

        console.log("Seed Created Successfully.");
        process.exit(0);
    } catch (err) {
        console.log("Error While Creating Seed.");
        process.exit(0);
    }
}

createSeed();