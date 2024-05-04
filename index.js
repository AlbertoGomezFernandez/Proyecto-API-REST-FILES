const express = require("express");
const { connectDB } = require("./src/config/db");
const userRouter = require("./src/routes/user.routes");
const playerRouter = require("./src/routes/player.routes");
const teamRouter = require("./src/routes/team.routes");
const { connectCloudinary } = require("./src/config/cloudinary");
require("dotenv").config();

const app = express();
const PORT = 3000;

connectDB();
connectCloudinary();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/users", userRouter);
app.use("/players", playerRouter);
app.use("/teams", teamRouter);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));