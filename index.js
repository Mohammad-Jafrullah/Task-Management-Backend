require('dotenv').config();
const express = require('express');
const db = require('./db');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = express();

db();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("runnning!!!");
})

app.use("/api", require("./routes/authentication"));
app.use("/project", require("./routes/project"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));